import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import work.likecu.share.MiniProgramRunApp;
import work.likecu.share.basemapper.SameService;
import work.likecu.share.controller.GlobalDataController;
import work.likecu.share.model.*;
import work.likecu.share.service.ReplayMessageOperationService;
import work.likecu.share.service.SignUsersService;
import work.likecu.share.service.SwiperMessageOperationService;
import work.likecu.share.util.RedisUtil;
import work.likecu.share.util.status.ResponseData;

import javax.annotation.Resource;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@SpringBootTest(classes = MiniProgramRunApp.class)
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
public class test {

    @Autowired
    private RedisUtil redisUtil;

    @Autowired
    private OSSMessage ossMessage;

    @Autowired
    private WXMessage wxMessage;

    @Autowired
    private Audience audience;
    @Resource
    private ReplayMessageOperationService replayMessageOperationService;

    @Before
    public void setup() {
    }

    @Resource
    private static SignUsersService signUsersService;


    @Test
    public void simple() {

        List list = new LinkedList();
        list.add(1);
        Object o = list.get(0);


    }



    public static void main(String[] args) {

    }
}
