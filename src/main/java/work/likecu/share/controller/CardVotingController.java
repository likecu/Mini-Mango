package work.likecu.share.controller;

import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import work.likecu.share.model.CardRecord;
import work.likecu.share.model.CardVoteRecord;
import work.likecu.share.model.CardVoting;
import work.likecu.share.service.CardVoteRecordService;
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
public class CardVotingController {
    @Resource
    private CardVotingService cardVotingService;
    @Resource
    private UserMessageOperationService userMessageOperationService;
    @Resource
    private CardVoteRecordService cardVoteRecordService;

    @ApiOperation(value = "得到用户身份卡投票列表")
    @RequestMapping("/getPublicVote")
    public BaseResponse createCard(HttpServletRequest request) {

        Integer userId = CheckAllow.checkAllow(userMessageOperationService, request);
        if (userId < 0) {
            return ResponseData.error(CodeEnum.SIGNATURE_NOT_ALLOW);
        }
        return ResponseData.success(cardVoteRecordService.getPublicVote());
    }

    @ApiOperation(value = "得到投票用户名单")
    @RequestMapping("/getVoteListById/{id}")
    public BaseResponse getVoteListById(@PathVariable Integer id, HttpServletRequest request) {

        Integer userId = CheckAllow.checkAllow(userMessageOperationService, request);
        if (userId < 0) {
            return ResponseData.error(CodeEnum.SIGNATURE_NOT_ALLOW);
        }
        return ResponseData.success(cardVoteRecordService.getVoteListById(id));
    }

    @ApiOperation(value = "进行身份投票")
    @RequestMapping("/voteOthers/{id}/{VoteId}")
    public BaseResponse voteOthers(@PathVariable Integer id,@PathVariable Integer VoteId, HttpServletRequest request) {

        Integer userId = CheckAllow.checkAllow(userMessageOperationService, request);
        if (userId < 0) {
            return ResponseData.error(CodeEnum.SIGNATURE_NOT_ALLOW);
        }
        CardVoteRecord cardVoteRecord=new CardVoteRecord();
        cardVoteRecord.setVoteId(VoteId);
        cardVoteRecord.setUserID(userId);
        if(cardVoteRecordService.findCount(cardVoteRecord)>0){
            return ResponseData.error(CodeEnum.ALREADY_VOTED);
        }

        cardVoteRecordService.add(cardVoteRecord);
        CardVoting cardVoting=new CardVoting();
        cardVoting.setCardId(VoteId);
        cardVoting.setUserId(id);
        if(cardVotingService.findList(cardVoting).size()>0) {
            int t = cardVotingService.findList(cardVoting).get(0).getAgreeNumber();
            cardVoting.setAgreeNumber(t + 1);
            cardVotingService.update(cardVoting);
        }
        else {
            return ResponseData.error(CodeEnum.INTERNAL_SERVER_ERROR);
        }
        return ResponseData.success();
    }

    @ApiOperation(value = "进行身份投票")
    @RequestMapping("/joinVoting/{id}")
    public BaseResponse joinVoting(@PathVariable Integer id, HttpServletRequest request) {

        Integer userId = CheckAllow.checkAllow(userMessageOperationService, request);
        if (userId < 0) {
            return ResponseData.error(CodeEnum.SIGNATURE_NOT_ALLOW);
        }
        CardVoting cardVoting=new CardVoting();
        cardVoting.setCardId(id);
        cardVoting.setUserId(userId);
        if(cardVotingService.findCount(cardVoting)==0) {
            cardVoting.setAgreeNumber(0);
            cardVoting.setIsFinished(0);
            cardVotingService.add(cardVoting);
            return ResponseData.success();
        }
       else return ResponseData.error(CodeEnum.CARD_REPEATED1);
    }

}
