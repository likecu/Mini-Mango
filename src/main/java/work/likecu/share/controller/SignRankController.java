package work.likecu.share.controller;

import io.swagger.annotations.ApiOperation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
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
import java.util.Calendar;
import java.util.Date;
import java.util.List;

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
     *
     * @param request
     * @param id
     * @return
     */
    @Transactional
    @PostMapping("/signrank/{id}")
    public BaseResponse signrank(HttpServletRequest request, @PathVariable Integer id) {
        Integer userId = CheckAllow.checkAllow(userMessageOperationService, request);

        if (userId < 0) {
            return ResponseData.out(CodeEnum.SIGNATURE_NOT_ALLOW);
        }

        List<SignUsers> list = signUsersService.getRank20(id);
        return ResponseData.success(list);
    }

    /**
     * 签到功能
     *
     * @param request
     * @param id
     */
    @ApiOperation(value = "签到功能")
    @Transactional
    @PostMapping("/sign/{id}")
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
        List<SignUsers> signUsers1 = signUsersService.findList(signUsers);

        if (signUsers1.size() == 0) {
            signUsers.setSigntime(new Date());
            signUsers.setCounter(1);
            signUsers.setIsGroup(0);
            signUsers.setGroupId(0);
            signUsersService.add(signUsers);

            SignRecord signRecord = new SignRecord();
            signRecord.setSigntime(new Date());
            signRecord.setSignType(id);
            signRecord.setUserId(userId);
            signRecordService.add(signRecord);

            return ResponseData.success(CodeEnum.SUCCESS_SIGN);
        }
        Date date = signUsers1.get(0).getSigntime();

        Calendar date2 = Calendar.getInstance();
        date2.set(Calendar.HOUR, 0);
        date2.set(Calendar.MINUTE, 0);
        date2.set(Calendar.SECOND, 0);

        Date date1 = new Date();
        date1.setTime(date2.getTimeInMillis());

        if (date.after(date1)) {
            return BaseResponse.out(CodeEnum.ALREADY_SIGN_TODAY);
        } else {

            signUsers.setId(signUsers1.get(0).getId());
            signUsers.setCounter(signUsers1.get(0).getCounter() + 1);
            signUsers.setSigntime(new Date());
            signUsersService.update(signUsers);

            SignRecord signRecord = new SignRecord();
            signRecord.setSigntime(new Date());
            signRecord.setSignType(id);
            signRecord.setUserId(userId);
            signRecordService.add(signRecord);

            return ResponseData.success(CodeEnum.SUCCESS_SIGN);
        }
    }

    /**
     * 签到列表
     *
     * @param request
     * @param id
     * @return
     */
    @Transactional
    @GetMapping("/getSign/{id}")
    public BaseResponse getSign(HttpServletRequest request, @PathVariable Integer id) {
        Integer userId = CheckAllow.checkAllow(userMessageOperationService, request);

        if (userId < 0) {
            return ResponseData.out(CodeEnum.SIGNATURE_NOT_ALLOW);
        }

        SignRecord signRecord = new SignRecord();
        signRecord.setUserId(id);

        List<SignRecord> list = signRecordService.findList(signRecord);
        return ResponseData.success(list);
    }

    /**
     * 个人签到次数
     *
     * @param request
     * @param
     * @return
     */
    @Transactional
    @PostMapping("/getMySign")
    public BaseResponse getMySign(HttpServletRequest request) {
        Integer userId = CheckAllow.checkAllow(userMessageOperationService, request);

        if (userId < 0) {
            return ResponseData.out(CodeEnum.SIGNATURE_NOT_ALLOW);
        }

        SignRecord signRecord = new SignRecord();
        signRecord.setUserId(userId);
        int[] ints = new int[2];
        ints[0] = signRecordService.findCount(signRecord);

        return ResponseData.success(ints);
    }


}
