package controller

import (
	"net/http"
	"github.com/ThanawitGZS/Sa-Receipt/config"
	"github.com/ThanawitGZS/Sa-Receipt/entity"
	"github.com/gin-gonic/gin"
)

func GetBookingByID(c *gin.Context){
	ID := c.Param("id")
    var booking entity.Booking

    db := config.DB()
    if err := db.Preload("Soups").Preload("Package").Preload("Table").Preload("Employee").First(&booking, ID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
        return
    }
    if booking.ID == 0 {
        c.JSON(http.StatusNoContent, gin.H{})
        return
    }
    c.JSON(http.StatusOK, booking)
}