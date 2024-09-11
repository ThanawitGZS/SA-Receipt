package controller

import (
	"net/http"
	"github.com/ThanawitGZS/Sa-Receipt/config"
	"github.com/ThanawitGZS/Sa-Receipt/entity"
	"github.com/gin-gonic/gin"
)

func GetReceipts(c *gin.Context){
	var receipts []entity.Receipt
	db := config.DB()
	
	results := db.Preload("Member").
	Preload("Employee").
	Preload("Coupon").
	Preload("Booking").
	Preload("Booking.Table").
	Find(&receipts)
	if results.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        return
    }
	c.JSON(http.StatusOK, &receipts)
}