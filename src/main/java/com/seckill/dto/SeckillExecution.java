package com.seckill.dto;

import com.seckill.entity.SuccessKilled;
import com.seckill.enums.SeckillStateEnum;
import lombok.Data;

/**
 * 封装秒杀执行后的结果
 */
@Data
public class SeckillExecution {
    private long seckillId;

    //秒杀执行结果状态
    private int state;

    private String stateInfo;

    private SuccessKilled successKilled;

    public SeckillExecution(long seckillId, SeckillStateEnum seckillStateEnum, SuccessKilled successKilled) {
        this.seckillId = seckillId;
        this.state = seckillStateEnum.getState();
        this.stateInfo = seckillStateEnum.getStateInfo();
        this.successKilled = successKilled;
    }

    public SeckillExecution(long seckillId, SeckillStateEnum seckillStateEnum) {
        this.seckillId = seckillId;
        this.state = seckillStateEnum.getState();
        this.stateInfo = seckillStateEnum.getStateInfo();
    }

}
