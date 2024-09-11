package controller

import (
	"net/http"
	"github.com/ThanawitGZS/Sa-Receipt/config"
	"github.com/ThanawitGZS/Sa-Receipt/entity"
	"github.com/gin-gonic/gin"
)

func GetTablebyID(c *gin.Context){
	var Table []entity.Table
	db := config.DB()
	db.Find(&Table)
	if db.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": db.Error.Error()})
        return
    }
	c.JSON(http.StatusOK, &Table)
}