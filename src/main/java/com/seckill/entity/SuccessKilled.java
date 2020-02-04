package com.seckill.entity;

import lombok.Data;
import lombok.ToString;

import java.util.Date;

@Data
@ToString
public class SuccessKilled {
    private long seckillId;
    private long userPhone;
    private int state;
    private Date createTime;
    /*多对一*/
    private Seckill seckill;
}
