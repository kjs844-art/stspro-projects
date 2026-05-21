package com.kosmo.pro888.model;

import lombok.Data;

@Data
public class MenuDTO {
    private Long menuId;
    private String menuName;
    private Integer price;
    private String description;
    private String category;
}
