package work.likecu.share.controller;

import io.swagger.annotations.ApiOperation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import work.likecu.share.model.UserMessage;
import work.likecu.share.model.WXMessage;
import work.likecu.share.model.WXSessionModel;
import work.likecu.share.service.ArticleOperationService;
import work.likecu.share.service.UserMessageOperationService;
import work.likecu.share.util.CheckMessageUtil;
import work.likecu.share.util.status.BaseResponse;
import work.likecu.share.util.status.CodeEnum;
import work.likecu.share.util.status.ResponseData;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;


@RestController
@RequestMapping("/wx")
public class UserMessageController {
    /**
     * @Path: work\likecu\share\controller\UserMessageController.java
     * @author: likecu
     * @create: 2022-05-28 20:36
     */

    @Resource
    private UserMessageOperationService userMessageOperationService;
    @Resource
    private ArticleOperationService articleOperationService;
    @Resource
    private WXMessage wxMessage;


    @GetMapping("/getUserMessage/{id}")
    @ApiOperation(value = "获取用户资料")
    public BaseResponse getUserMessage(@PathVariable Integer id, HttpServletRequest request) {
        UserMessage userMessage;

        WXSessionModel wxSessionModel = (WXSessionModel) request.getSession().getAttribute("user");

        if (id == -1 || wxSessionModel.getUserId().equals(id)) {
            //获取自己
            userMessage = userMessageOperationService.getById(wxSessionModel.getUserId());
        } else {
            userMessage = userMessageOperationService.getById(id);
            //获取他人
            userMessage.setUserPhone(null);
            userMessage.setUserToken(null);
            userMessage.setUserId(null);
        }
        return ResponseData.out(CodeEnum.SUCCESS, userMessage);
    }

    /**
     * 更改或者添加用户资料
     */
    @PostMapping("/changeUserMessage")
    @Transactional
    @ApiOperation(value = "更改用户资料")
    public BaseResponse changeUserMessage(@RequestBody UserMessage userMessage, HttpServletRequest request) {

        if (CheckMessageUtil.checkMessage(userMessage.getUserMotto(), wxMessage)) {
            return ResponseData.error(403, "检测到内容违规,请重新输入");
        }
        WXSessionModel wxSessionModel = (WXSessionModel) request.getSession().getAttribute("user");
        Integer id = wxSessionModel.getUserId();
        userMessage.setUserId(id);
        try {
            if (userMessage.getUserAvatar().isEmpty()) {
                userMessage.setUserAvatar(null);
            }
        } catch (Exception ignored) {
        }
        try {
            if (userMessage.getUserNickname().isEmpty()) {
                userMessage.setUserNickname(null);
            }
        } catch (Exception ignored) {
        }
        ;
        try {
            if (userMessage.getUserMotto().isEmpty()) {
                userMessage.setUserMotto(null);
            }
        } catch (Exception ignored) {
        }
        ;
        // 此处有严重bug！！！！！！！！！！！！！ 考虑使用bean来遍历这个对象
        // maybe 已修复
        //        有很多为空的情况，进行update之后就变为空了
        // 如果update失败，则会引发空指针 返回500.
        userMessageOperationService.update(userMessage);
        return BaseResponse.out(CodeEnum.SUCCESS);
    }

    @GetMapping("/getUserArticle/{userId}/{pageNumber}")
    @ApiOperation(value = "获取用户所有文章")
    public BaseResponse getUserArticle(@PathVariable Integer userId, @PathVariable Integer pageNumber, HttpServletRequest request) {
        if (userId == -1) {
            WXSessionModel wxSessionModel = (WXSessionModel) request.getSession().getAttribute("user");
            return ResponseData.success(articleOperationService.getNewArticle(pageNumber, null, null, wxSessionModel.getUserId()));
        } else {
            return ResponseData.success(articleOperationService.getNewArticle(pageNumber, null, null, userId));
        }
    }


    @GetMapping("/getUserId")
    @ApiOperation("获取用户ID")
    public static BaseResponse getUserId(HttpServletRequest request) {

        WXSessionModel wxSessionModel = (WXSessionModel) request.getSession().getAttribute("user");

        return ResponseData.success(wxSessionModel.getUserId());
    }


}
