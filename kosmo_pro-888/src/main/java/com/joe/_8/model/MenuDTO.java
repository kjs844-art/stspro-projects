package com.joe._8.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MenuDTO {
    private String menu_id;
    private String store_id;
    private String menu_name;
    private int price;
}
