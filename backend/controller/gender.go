package controller

import (
   "net/http"
   "github.com/ThanawitGZS/Sa-Receipt/config"
   "github.com/ThanawitGZS/Sa-Receipt/entity"
   "github.com/gin-gonic/gin"
)

func GetGenders(c *gin.Context) {
   var genders []entity.Gender

   db := config.DB()
   db.Find(&genders)
   c.JSON(http.StatusOK, &genders)
}