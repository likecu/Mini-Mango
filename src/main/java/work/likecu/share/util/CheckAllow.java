package work.likecu.share.util;

import work.likecu.share.model.UserMessage;
import work.likecu.share.model.WXSessionModel;
import work.likecu.share.service.UserMessageOperationService;

import javax.servlet.http.HttpServletRequest;

/**
 * 检查是否拉黑
 */
public class CheckAllow {

    public static Integer checkAllow(UserMessageOperationService userMessageOperationService, HttpServletRequest request) {
        WXSessionModel user = (WXSessionModel) request.getSession().getAttribute("user");

        if (userMessageOperationService.getById(user.getUserId()).getUserAllow().equals("2")) {
            return -1;
        }
        return user.getUserId();
    }

    public static UserMessage getUserMessage(UserMessageOperationService userMessageOperationService, HttpServletRequest request) {
        WXSessionModel user = (WXSessionModel) request.getSession().getAttribute("user");
        UserMessage userMessage = userMessageOperationService.getById(user.getUserId());
        if (userMessage.getUserAllow().equals("2")) {
            return null;
        }
        return userMessage;
    }
}
