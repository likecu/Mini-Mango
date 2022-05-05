package work.likecu.share.controller;

import io.swagger.annotations.ApiOperation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import work.likecu.share.model.GroupMessage;
import work.likecu.share.model.ThemeMessage;
import work.likecu.share.model.UserMessage;
import work.likecu.share.service.GroupOperationService;
import work.likecu.share.service.ThemeMessageOperationService;
import work.likecu.share.service.UserMessageOperationService;
import work.likecu.share.util.CheckAllow;
import work.likecu.share.util.status.BaseResponse;
import work.likecu.share.util.status.CodeEnum;
import work.likecu.share.util.status.ResponseData;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

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
    @ApiOperation(value = "创建小组")
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
        groupMessage1.setUserType(3);
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

    @PostMapping("/getGroupMembers/{themeId}")
    @Transactional
    @ApiOperation(value = "获取小组的成员")
    public BaseResponse getGroupMembers(@PathVariable String themeId, HttpServletRequest request) {
        System.out.println(themeId);
        Integer userId = CheckAllow.checkAllow(userMessageOperationService, request);
        if (userId < 0) {
            return ResponseData.out(CodeEnum.SIGNATURE_NOT_ALLOW);
        }
        return ResponseData.out(CodeEnum.SUCCESS,groupOperationService.getGroupMembers(themeId));
    }

    @PostMapping("/inviteGroupMembers/{userName}/{themeName}")
    @Transactional
    @ApiOperation(value = "获取小组的成员")
    public BaseResponse inviteGroupMembers(@PathVariable Integer userName,@PathVariable String themeName,HttpServletRequest request) {
        Integer userId = CheckAllow.checkAllow(userMessageOperationService, request);
        if (userId < 0) {
            return ResponseData.out(CodeEnum.SIGNATURE_NOT_ALLOW);
        }

        //新建将小组成员赋值 ，通过id
        GroupMessage groupMessage1=new GroupMessage();
        groupMessage1.setuserId(userName);
        groupMessage1.setThemeId(themeName);
        groupMessage1.setUserType(1);
        groupOperationService.add(groupMessage1);

        return ResponseData.out(CodeEnum.SUCCESS);
    }


    @PostMapping("/inviteGroupMembersByName/{userName}/{themeName}")
    @Transactional
    @ApiOperation(value = "邀请小组的成员")
    public BaseResponse inviteGroupMembersByName(@PathVariable String userName,@PathVariable String themeName,HttpServletRequest request) {
        Integer userId = CheckAllow.checkAllow(userMessageOperationService, request);
        if (userId < 0) {
            return ResponseData.out(CodeEnum.SIGNATURE_NOT_ALLOW);
        }
        //先判断string内有没有“” 或者 ‘’
        userName=userName.replaceAll("\"","");
        userName=userName.replaceAll("\'","");

        themeName=themeName.replaceAll("\"","");
        themeName=themeName.replaceAll("\'","");
        //根据名字找到有用户id，若存在多个用户，则返回出错
        List<UserMessage> userMessages=userMessageOperationService.userMessageByName(userName);

        if(userMessages.size()>=2){
            return ResponseData.out(CodeEnum.User_Name_Repeated);
        }
        if(userMessages.size()==0){
            return ResponseData.out(CodeEnum.User_Name_Not_Found);
        }

        //新建将小组成员赋值 ，通过id
        GroupMessage groupMessage1=new GroupMessage();
        groupMessage1.setuserId(userMessages.get(0).getUserId());
        groupMessage1.setThemeId(themeName);
        groupMessage1.setUserType(1);

        //判断用户是否存在组内
        if(groupOperationService.findList(groupMessage1).size()>0){
            return ResponseData.out(CodeEnum.User_Already_Join);
        };


        groupOperationService.add(groupMessage1);

        return ResponseData.out(CodeEnum.SUCCESS);
    }


}
