package com.joe._8.store;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StoreDTO {
    private String store_id;
    private String store_name;
    private String location;
    private String phone;
}
