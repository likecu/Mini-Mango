package work.likecu.share.controller;


import io.swagger.annotations.ApiOperation;
import io.swagger.models.auth.In;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import work.likecu.share.model.Card;
import work.likecu.share.model.CardRecord;
import work.likecu.share.service.CardControlService;
import work.likecu.share.service.CardRecordOperationService;
import work.likecu.share.service.UserMessageOperationService;
import work.likecu.share.util.CheckAllow;
import work.likecu.share.util.status.BaseResponse;
import work.likecu.share.util.status.CodeEnum;
import work.likecu.share.util.status.ResponseData;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/wx")

public class CardOperationController {
    @Resource
    private UserMessageOperationService userMessageOperationService;
    @Resource
    private CardControlService cardControlService;
    @Resource
    private CardRecordOperationService cardRecordOperationService;

    @ApiOperation(value = "创建新类型的卡")
    @RequestMapping("/createCard")
    public BaseResponse createCard(@RequestBody Card card, HttpServletRequest request) {

        Integer userId = CheckAllow.checkAllow(userMessageOperationService, request);
        if(userId<0){
            return ResponseData.error(CodeEnum.SIGNATURE_NOT_ALLOW);
        }

        Card card1=new Card();
        card1.setCardName(card.getCardName());
        System.out.println(card1.getCardName());
        if(cardControlService.findCount(card1)==0){

            cardControlService.add(card);

            return ResponseData.success();
        }
        else {
            return ResponseData.error(403,"已存在该卡");
        }
    }

    @ApiOperation(value = "发放卡")
    @RequestMapping("/issueCard/{card_id}/{user_id}")
    public BaseResponse issueCard(@PathVariable Integer card_id,@PathVariable Integer user_id, HttpServletRequest request) {

        Integer userId = CheckAllow.checkAllow(userMessageOperationService, request);
        if(userId<0){
            return ResponseData.error(CodeEnum.SIGNATURE_NOT_ALLOW);
        }
        CardRecord cardRecord=new CardRecord();
        cardRecord.setCardId(card_id);
        cardRecord.setUserID(user_id);
        cardRecordOperationService.add(cardRecord);
        return ResponseData.success();
    }

    @ApiOperation(value = "得到用户所有卡片")
    @RequestMapping("/getCards")
    public BaseResponse getCards(HttpServletRequest request){
        Integer userId = CheckAllow.checkAllow(userMessageOperationService, request);
        if(userId<0){
            return ResponseData.error(CodeEnum.SIGNATURE_NOT_ALLOW);
        }
        return ResponseData.success(cardRecordOperationService.getByUserId(userId));
    }

}
