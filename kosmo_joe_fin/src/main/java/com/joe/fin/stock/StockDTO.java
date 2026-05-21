package com.joe.fin.stock;

// 🧑‍🏫 Teacher Note: We import Lombok's @Data to save us from writing 
// Getters, Setters, toString, and equals methods manually.
import lombok.Data;
import java.math.BigDecimal;

/**
 * 🧑‍🏫 What is a DTO?
 * DTO stands for "Data Transfer Object". 
 * Think of it as a "shipping container" for data. 
 * Its only job is to hold data while it moves between the Service and the View.
 */
@Data
public class StockDTO {

    // 🧑‍🏫 Why 'private'?
    // This is called "Encapsulation". We lock the variables so nobody can 
    // change them directly. They must use the @Data-generated methods.

    // 1. The Stock Symbol (e.g., AAPL)
    private String ticker;

    // 2. The Full Company Name
    private String companyName;

    /**
     * 🧑‍🏫 Why 'BigDecimal' instead of 'double'?
     * 'double' and 'float' are "floating point" numbers. They are great for science, 
     * but they have rounding errors (like 1.00000000004).
     * In Finance, we NEVER use double. BigDecimal is accurate to the penny!
     */
    private BigDecimal currentPrice;
    
    // 3. The industry the company belongs to
    private String industry;
    
    // 4. Daily change in percentage
    private BigDecimal changePercent;

}
