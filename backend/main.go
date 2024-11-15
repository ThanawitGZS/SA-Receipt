package main

import (
	"net/http"
	"github.com/ThanawitGZS/Sa-Receipt/config"
	"github.com/ThanawitGZS/Sa-Receipt/controller"
	"github.com/ThanawitGZS/Sa-Receipt/middlewares"
	"github.com/gin-gonic/gin"
)

const PORT = "8000"

func main() {
   // open connection database
   config.ConnectionDB()

   // Generate databases
   config.SetupDatabase()

   r := gin.Default()
   r.Use(CORSMiddleware())

   // Auth Route
   r.POST("/signIn", controller.SignIn)

   router := r.Group("/")
   {
       router.Use(middlewares.Authorizes())

       // Employee Route
       r.POST("/employee", controller.CreateEmployee)
       r.GET("/employees", controller.GetEmployees)
       r.GET("/employee/:id", controller.GetEmployeeByID)
       r.PATCH("/employee/:id", controller.UpdateEmployee)
       r.DELETE("/employee/:id", controller.DeleteEmployee)

       // Member Routes
       r.POST("/member", controller.CreateMember)
       r.POST("/api/check-member/:phonenumber", controller.CheckMember)
       r.GET("/members", controller.GetMembers)
       r.GET("/member/:id", controller.GetMemberByID)
       r.PATCH("/member/:id", controller.UpdateMember)
       r.DELETE("/member/:id", controller.DeleteMember)

       // Gender Routes
       r.GET("/genders", controller.GetGenders)

       // Position Routes
       r.GET("/positions", controller.GetPositions)

       // Rank Routes
       r.GET("/ranks", controller.GetRanks)

       // Receipt Rountes
       r.GET("/receipt", controller.GetReceipts)
       r.POST("/receipt", controller.CreateReceipt)

       // Coupon Rountes
       r.POST("/api/check-coupon/:code", controller.CheckCoupon)

       r.GET("/table", controller.GetTables)

       r.GET("/booking/:id", controller.GetBookingByID)

   }

   r.GET("/", func(c *gin.Context) {
       c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
   })

   // Run the server
   r.Run("localhost:" + PORT)
}

func CORSMiddleware() gin.HandlerFunc {
   return func(c *gin.Context) {
       c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
       c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
       c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
       c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

       if c.Request.Method == "OPTIONS" {
           c.AbortWithStatus(204)
           return
       }
       c.Next()
   }
}