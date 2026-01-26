package models

import "time"

// Expense represents a financial expense.
type Expense struct {
	ID            string    `json:"id"`
	Amount        float64   `json:"amount"`
	Currency      string    `json:"currency"`
	Description   string    `json:"description"`
	Category      string    `json:"category"`
	Date          time.Time `json:"date"`
	PaymentMethod string    `json:"payment_method"`
}

// Allowed Categories
const (
	CategoryAlimentacion   = "Alimentación"
	CategoryTransporte    = "Transporte"
	CategoryServicios     = "Servicios"
	CategoryEntretenimiento = "Entretenimiento"
	CategorySalud         = "Salud"
	CategoryOtros         = "Otros"
)
