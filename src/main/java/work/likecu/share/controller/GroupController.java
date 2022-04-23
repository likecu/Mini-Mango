package work.likecu.share.controller;

import io.swagger.annotations.ApiOperation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import work.likecu.share.model.GroupMessage;
import work.likecu.share.model.ThemeMessage;
import work.likecu.share.service.GroupOperationService;
import work.likecu.share.service.ThemeMessageOperationService;
import work.likecu.share.service.UserMessageOperationService;
import work.likecu.share.util.CheckAllow;
import work.likecu.share.util.status.BaseResponse;
import work.likecu.share.util.status.CodeEnum;
import work.likecu.share.util.status.ResponseData;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/wx")
public class GroupController {

    @Resource
    UserMessageOperationService userMessageOperationService;

    @Resource
    GroupOperationService groupOperationService;

    @Resource
    ThemeMessageOperationService themeMessageOperationService;


    @PostMapping("/addGroup")
    @Transactional
    @ApiOperation(value = "创建主题")
    public BaseResponse addGroup(@RequestBody ThemeMessage themeMessage, HttpServletRequest request) {

        Integer userId = CheckAllow.checkAllow(userMessageOperationService, request);
        if(themeMessageOperationService.hasTheme(themeMessage.getThemeTitle())){
            return ResponseData.out(CodeEnum.Theme_NOT_ALLOW);
        }
        if (userId < 0) {
            return ResponseData.out(CodeEnum.SIGNATURE_NOT_ALLOW);
        }
        themeMessage.setOwnerId(userId);
        themeMessageOperationService.add(themeMessage);

        GroupMessage groupMessage1=new GroupMessage();
        groupMessage1.setUserType(1);
        groupMessage1.setuserId(userId);

        groupMessage1.setThemeId(themeMessage.getThemeTitle());
        groupOperationService.add(groupMessage1);
        return ResponseData.success();
    }

    @PostMapping("/deleteGroup")
    @Transactional
    @ApiOperation(value = "删除小组")
    public BaseResponse deleteGroup(@RequestBody ThemeMessage themeMessage, HttpServletRequest request) {

        Integer userId = CheckAllow.checkAllow(userMessageOperationService, request);
        // 先判断小组的主人是否一样
        if(!themeMessageOperationService.hasTheme(themeMessage.getThemeTitle())){
            return ResponseData.out(CodeEnum.Theme_Del_NOT_ALLOW);
        }
        if (userId < 0) {
            return ResponseData.out(CodeEnum.SIGNATURE_NOT_ALLOW);
        }
        if(!userId.equals(themeMessageOperationService.getOwner(themeMessage.getThemeTitle()))){
            return ResponseData.out(CodeEnum.Theme_Author_NOT_ALLOW);
        }
        ThemeMessage mg1=new ThemeMessage();
        mg1.setThemeTitle(themeMessage.getThemeTitle());

        themeMessageOperationService.delete(mg1);

        GroupMessage groupMessage1=new GroupMessage();
        groupMessage1.setThemeId(themeMessage.getThemeTitle());
        groupOperationService.delete(groupMessage1);
        return ResponseData.success();
    }

    @PostMapping("/getUserGroups")
    @Transactional
    @ApiOperation(value = "获取用户的小组")
    public BaseResponse getUserGroups(@RequestBody GroupMessage groupMessage, HttpServletRequest request) {
        Integer userId = CheckAllow.checkAllow(userMessageOperationService, request);
        GroupMessage groupMessage1=new GroupMessage();
        groupMessage1.setuserId(userId);
        return ResponseData.out(CodeEnum.SUCCESS,groupOperationService.findList(groupMessage1));
    }

    @PostMapping("/updateUserType")
    @Transactional
    @ApiOperation(value = "更新用户权限")
    public BaseResponse updateUserType(@RequestBody GroupMessage groupMessage, HttpServletRequest request) {
        Integer userId = CheckAllow.checkAllow(userMessageOperationService, request);
        System.out.println(groupMessage.getThemeId());
        System.out.println(userId);
        System.out.println(groupMessage.getUserId());
        System.out.println(groupMessage.getcreateTime());
        System.out.println(groupMessage.getuserType());
        groupOperationService.updateUserType(groupMessage.getThemeId(),userId,groupMessage.getuserType());
        return ResponseData.out(CodeEnum.SUCCESS);
    }


}
