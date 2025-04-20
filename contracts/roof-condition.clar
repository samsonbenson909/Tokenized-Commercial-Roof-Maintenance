;; Roof Condition Contract
;; Tracks status and remaining useful life

(define-map roof-conditions
  { building-id: uint }
  {
    roof-type: (string-utf8 50),
    installation-date: uint,
    last-inspection-date: uint,
    condition-rating: uint,  ;; 1-10 scale
    estimated-remaining-life: uint,  ;; in months
    inspector: principal,
    last-updated: uint
  }
)

(define-public (register-roof-condition
                (building-id uint)
                (roof-type (string-utf8 50))
                (installation-date uint)
                (condition-rating uint)
                (estimated-remaining-life uint))
  (begin
    (asserts! (<= condition-rating u10) (err u1))
    (asserts! (>= condition-rating u1) (err u2))
    (map-set roof-conditions
      { building-id: building-id }
      {
        roof-type: roof-type,
        installation-date: installation-date,
        last-inspection-date: block-height,
        condition-rating: condition-rating,
        estimated-remaining-life: estimated-remaining-life,
        inspector: tx-sender,
        last-updated: block-height
      }
    )
    (ok true)
  )
)

(define-public (update-roof-condition
                (building-id uint)
                (condition-rating uint)
                (estimated-remaining-life uint))
  (let ((current-condition (unwrap! (get-roof-condition building-id) (err u3))))
    (begin
      (asserts! (<= condition-rating u10) (err u1))
      (asserts! (>= condition-rating u1) (err u2))
      (map-set roof-conditions
        { building-id: building-id }
        (merge current-condition {
          condition-rating: condition-rating,
          estimated-remaining-life: estimated-remaining-life,
          last-inspection-date: block-height,
          inspector: tx-sender,
          last-updated: block-height
        })
      )
      (ok true)
    )
  )
)

(define-read-only (get-roof-condition (building-id uint))
  (map-get? roof-conditions { building-id: building-id })
)
