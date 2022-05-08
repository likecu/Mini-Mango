package work.likecu.share.controller;

import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import work.likecu.share.model.Card;
import work.likecu.share.model.CardVoting;
import work.likecu.share.service.CardVotingService;
import work.likecu.share.service.UserMessageOperationService;
import work.likecu.share.util.CheckAllow;
import work.likecu.share.util.status.BaseResponse;
import work.likecu.share.util.status.CodeEnum;
import work.likecu.share.util.status.ResponseData;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/wx")
public class CardVotingConroller {
    @Resource
    private CardVotingService cardVotingService;
    @Resource
    private UserMessageOperationService userMessageOperationService;

    @ApiOperation(value = "得到用户身份卡投票列表")
    @RequestMapping("/getVotingList")
    public BaseResponse createCard(HttpServletRequest request) {

        Integer userId = CheckAllow.checkAllow(userMessageOperationService, request);
        if(userId<0){
            return ResponseData.error(CodeEnum.SIGNATURE_NOT_ALLOW);
        }
        CardVoting cardVoting=new CardVoting();
        cardVoting.setIsFinished(0);
        return ResponseData.success(cardVotingService.findList(cardVoting));
    }

}
