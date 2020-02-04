package com.seckill.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({
        "classpath:spring/spring-service.xml",
        "classpath:spring/spring-dao.xml"})
public class SeckillServiceTest {

    @Test
    public void getSeckillList() {
    }

    @Test
    public void getById() {
    }

    @Test
    public void exportSeckillUrl() {
    }

    @Test
    public void executeSeckill() {
    }
}