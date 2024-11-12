package controller

import (
	"net/http"
	"github.com/ThanawitGZS/Sa-Receipt/config"
	"github.com/ThanawitGZS/Sa-Receipt/entity"
	"github.com/gin-gonic/gin"
)

func GetTables(c *gin.Context){
	var Tables []entity.Table
	db := config.DB()
	
	results := db.Preload("TableStatus").Find(&Tables)
	if results.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        return
    }
	c.JSON(http.StatusOK, &Tables)
}