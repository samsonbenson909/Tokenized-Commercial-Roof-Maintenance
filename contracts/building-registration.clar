;; Building Registration Contract
;; Records details of commercial structures

(define-data-var last-building-id uint u0)

(define-map buildings
  { building-id: uint }
  {
    owner: principal,
    address: (string-utf8 100),
    construction-year: uint,
    square-footage: uint,
    building-type: (string-utf8 50),
    registered-at: uint
  }
)

(define-public (register-building
                (address (string-utf8 100))
                (construction-year uint)
                (square-footage uint)
                (building-type (string-utf8 50)))
  (let ((new-id (+ (var-get last-building-id) u1)))
    (begin
      (var-set last-building-id new-id)
      (map-set buildings
        { building-id: new-id }
        {
          owner: tx-sender,
          address: address,
          construction-year: construction-year,
          square-footage: square-footage,
          building-type: building-type,
          registered-at: block-height
        }
      )
      (ok new-id)
    )
  )
)

(define-read-only (get-building (building-id uint))
  (map-get? buildings { building-id: building-id })
)

(define-read-only (get-building-count)
  (var-get last-building-id)
)

(define-public (transfer-building (building-id uint) (new-owner principal))
  (let ((building (unwrap! (get-building building-id) (err u1))))
    (begin
      (asserts! (is-eq tx-sender (get owner building)) (err u2))
      (map-set buildings
        { building-id: building-id }
        (merge building { owner: new-owner })
      )
      (ok true)
    )
  )
)
