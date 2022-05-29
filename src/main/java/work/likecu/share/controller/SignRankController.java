package work.likecu.share.controller;

import io.swagger.annotations.ApiOperation;
import javazoom.spi.mpeg.sampled.file.MpegAudioFileReader;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import work.likecu.share.model.SignRecord;
import work.likecu.share.model.SignUsers;
import work.likecu.share.service.SignRecordService;
import work.likecu.share.service.SignUsersService;
import work.likecu.share.service.UserMessageOperationService;
import work.likecu.share.util.CheckAllow;
import work.likecu.share.util.status.BaseResponse;
import work.likecu.share.util.status.CodeEnum;
import work.likecu.share.util.status.ResponseData;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.xml.ws.Response;
import java.io.InputStream;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/wx")
public class SignRankController {
    /**
     * @Path: work\likecu\share\controller\SignRankController.java
     * @author: likecu
     * @create: 2022-05-28 20:24
     */

    @Resource
    private SignUsersService signUsersService;
    @Resource
    private SignRecordService signRecordService;
    @Resource
    private UserMessageOperationService userMessageOperationService;

    /**
     * 签到排行 返回top20
     * @param request
     * @param id
     * @return
     */
    @Transactional
    @GetMapping ("/signrank/{id}")
    public BaseResponse signrank(HttpServletRequest request, @PathVariable Integer id) {
        Integer userId = CheckAllow.checkAllow(userMessageOperationService, request);

        if (userId < 0) {
            return ResponseData.out(CodeEnum.SIGNATURE_NOT_ALLOW);
        }

        List<SignUsers> list=signUsersService.getRank20(id);
        return ResponseData.success(list);
    }

    /**
     * 签到功能
     * @param request
     * @param id
     */
    @ApiOperation(value = "签到功能")
    @Transactional
    @GetMapping("/sign/{id}")
    public BaseResponse sign(HttpServletRequest request, @PathVariable Integer id) {
        Integer userId = CheckAllow.checkAllow(userMessageOperationService, request);

        if (userId < 0) {
            return ResponseData.out(CodeEnum.SIGNATURE_NOT_ALLOW);
        }

        SignUsers signUsers = new SignUsers();
        signUsers.setUserId(userId);
        signUsers.setSignType(id);


//        System.out.println(signUsers.getUserId());
//        System.out.println(signUsers.getSignType());
//        signUsersService.findAll();
//        return ResponseData.success();
        List<SignUsers> signUsers1= signUsersService.findList(signUsers);

        if(signUsers1.size()==0){
            signUsers.setSigntime(new Date());
            signUsers.setCounter(1);
            signUsers.setIsGroup(0);
            signUsers.setGroupId(0);
            signUsersService.add(signUsers);
            return ResponseData.success();
        }
        Date date = signUsers1.get(0).getSigntime();

        Calendar date2 = Calendar.getInstance();
        date2.set(Calendar.HOUR, 0);
        date2.set(Calendar.MINUTE, 0);
        date2.set(Calendar.SECOND, 0);

        Date date1=new Date();
        date1.setTime(date2.getTimeInMillis());

        if (date.after(date1)) {
            return BaseResponse.out(CodeEnum.ALREADY_SIGN_TODAY);
        } else {

            signUsers.setId(signUsers1.get(0).getId());
            signUsers.setCounter(signUsers1.get(0).getCounter() + 1);
            signUsers.setSigntime(new Date());
            signUsersService.update(signUsers);

            SignRecord signRecord=new SignRecord();
            signRecord.setSigntime(new Date());
            signRecord.setSignType(id);
            signRecord.setUserId(userId);
            signRecordService.add(signRecord);

            return ResponseData.success();
        }
    }


}
