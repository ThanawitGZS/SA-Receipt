package controller

import (
   "net/http"
   "github.com/ThanawitGZS/Sa-Receipt/config"
   "github.com/ThanawitGZS/Sa-Receipt/entity"
   "github.com/gin-gonic/gin"
)

func GetRanks(c *gin.Context) {
   var ranks []entity.Rank

   db := config.DB()
   db.Find(&ranks)
   c.JSON(http.StatusOK, &ranks)
}