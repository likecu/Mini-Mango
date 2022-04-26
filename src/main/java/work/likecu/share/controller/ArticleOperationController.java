package work.likecu.share.controller;

import io.swagger.annotations.ApiOperation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import work.likecu.share.model.*;
import work.likecu.share.service.*;
import work.likecu.share.util.CheckAllow;
import work.likecu.share.util.CheckMessageUtil;
import work.likecu.share.util.status.BaseResponse;
import work.likecu.share.util.status.CodeEnum;
import work.likecu.share.util.status.ResponseData;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/wx")
public class ArticleOperationController {

    @Resource
    private ArticleOperationService articleOperationService;
    @Resource
    private UserMessageOperationService userMessageOperationService;
    @Resource
    private CommentService commentService;
    @Resource
    private ReplayMessageOperationService replayMessageOperationService;
    @Resource
    private LikeArticleService likeArticleService;
    @Resource
    private NoticeOperationService noticeOperationService;
    @Resource
    private WXMessage wxMessage;
    @Resource
    private ThemeMessageOperationService themeMessageOperationService;
    @Resource
    private PictureUploadService pictureUploadService;

    @PostMapping("/saveArticle")
    @Transactional
    @ApiOperation(value = "保存文章")
    public BaseResponse saveArticle(@RequestBody ArticleMessage articleMessage, HttpServletRequest request) {
        Integer userId = CheckAllow.checkAllow(userMessageOperationService, request);

        if (userId < 0) {
            return ResponseData.out(CodeEnum.SIGNATURE_NOT_ALLOW);
        }
        if (CheckMessageUtil.checkMessage(articleMessage.getArticleContent(), wxMessage)) {
            return ResponseData.error(403, "检测到内容违规,请重新输入");
        }
        articleMessage.setUserId(userId);

        if (articleMessage.getThemeId() < 4) {
            articleMessage.setIsPublic(1);
        }

        articleOperationService.add(articleMessage);

        return ResponseData.success();
    }

    @PostMapping("/uploadImg")
    @Transactional
    @ApiOperation("上传图片到服务器")
    public  BaseResponse speechRecognition(@RequestBody Picture picture, HttpServletRequest request){
        Integer userId = CheckAllow.checkAllow(userMessageOperationService, request);

        if (userId < 0) {
            return ResponseData.out(CodeEnum.SIGNATURE_NOT_ALLOW);
        }

        picture.setUploadTime(new Date());

        pictureUploadService.add(picture);

        return ResponseData.success();
    }


    @PostMapping("/deleteArticle/{articleId}")
    @Transactional
    @ApiOperation(value = "删除文章")
    public BaseResponse deleteArticle(@PathVariable Integer articleId, HttpServletRequest request) {
        Integer userId = CheckAllow.checkAllow(userMessageOperationService, request);

        if (userId < 0) {
            return ResponseData.out(CodeEnum.SIGNATURE_NOT_ALLOW);
        }
        ArticleMessage articleMessage = new ArticleMessage();

        articleMessage.setArticleId(articleId);
        articleMessage.setUserId(userId);
        articleOperationService.delete(articleMessage);

        CommentMessage commentMessage = new CommentMessage();
        commentMessage.setArticleId(articleId);
        List<CommentMessage> list = commentService.findList(commentMessage);

        ReplayMessage replayMessage = new ReplayMessage();
        for (int i = 0; i < list.size(); i++) {
            replayMessage.setCommentId(list.get(i).getCommentId());
            replayMessageOperationService.delete(replayMessage);
        }
        commentService.delete(commentMessage);

        NoticeMessage noticeMessage = new NoticeMessage();
        noticeMessage.setArticleId(articleId);
        noticeOperationService.delete(noticeMessage);

        return ResponseData.success();
    }

    @PostMapping("/deleteComment/{commentId}")
    @Transactional
    @ApiOperation(value = "删除评论")
    public BaseResponse deleteComment(@PathVariable Integer commentId, HttpServletRequest request) {

        Integer userId = CheckAllow.checkAllow(userMessageOperationService, request);

        // 数据库
        // 先删除评论
        CommentMessage commentMessage = new CommentMessage();
        commentMessage.setCommentId(commentId);
        commentMessage.setUserId(userId);
        Integer article_id = commentService.findList(commentMessage).get(0).getArticleId();
        commentService.delete(commentMessage);

        // 数据库
        // 删除通知
        NoticeMessage noticeMessage = new NoticeMessage();
        noticeMessage.setCommentId(commentId);


        noticeOperationService.delete(noticeMessage);

        // 下的所有评论都要删除
        ReplayMessage replayMessage = new ReplayMessage();
        replayMessage.setCommentId(commentId);
        List<ReplayMessage> list = replayMessageOperationService.findList(replayMessage);

        // 在文章的评论下减少相对应数量的评论
        replayMessageOperationService.delete(replayMessage);
        Integer counter = list.size() + 1;
        ArticleMessage articleMessage=articleOperationService.getNewArticleById(article_id);
        articleMessage.setCommentCounter(articleMessage.getCommentCounter()-counter);
        articleOperationService.update(articleMessage);

        for (int i = 0; i < list.size(); i++) {
            NoticeMessage noticeMessage1 = new NoticeMessage();
            noticeMessage1.setReplayId(list.get(i).getReplayId());
            noticeOperationService.delete(noticeMessage1);
        }


        return ResponseData.success();
    }

    @PostMapping("/deleteReplay/{replayId}")
    @Transactional
    @ApiOperation(value = "删除回复")
    public BaseResponse deleteReplay(@PathVariable Integer replayId, HttpServletRequest request) {
        //得到用户名
        WXSessionModel user = (WXSessionModel) request.getSession().getAttribute("user");

        //先找出回复的 id
        ReplayMessage replayMessage = new ReplayMessage();
        replayMessage.setReplayId(replayId);
        replayMessage.setUserId(user.getUserId());

        //根据回复的id找出评论的id
        Integer id = replayMessageOperationService.findList(replayMessage).get(0).getCommentId();
        CommentMessage commentMessage = new CommentMessage();
        commentMessage.setUserId(id);
        CommentMessage commentMessage1 = commentService.findList(commentMessage).get(0);

        //根据评论id找出文章的id，减少文章评论数
        ArticleMessage newArticle = articleOperationService.getNewArticleById(commentMessage1.getArticleId());
        newArticle.setCommentCounter(newArticle.getCommentCounter() - 1);
        articleOperationService.update(newArticle);

        //删除这个回复
        replayMessageOperationService.deleteById(replayMessage);

        //删除这条回复的通知
        NoticeMessage noticeMessage = new NoticeMessage();
        noticeMessage.setReplayId(replayId);
        noticeOperationService.delete(noticeMessage);


        return ResponseData.success();
    }

    @GetMapping("/getLikeArticle/{articleId}")
    @Transactional
    @ApiOperation(value = "检测文章是否被喜欢")
    public BaseResponse getLikeArticle(@PathVariable Integer articleId, HttpServletRequest request) {
        WXSessionModel user = (WXSessionModel) request.getSession().getAttribute("user");
        LikeMessage likeMessage = new LikeMessage();
        likeMessage.setArticleId(articleId);
        likeMessage.setUserId(user.getUserId());

        Integer count = likeArticleService.findCount(likeMessage);
        if (count == 0) {
            return ResponseData.success(false);
        }
        return ResponseData.success(true);
    }

    @GetMapping("/likeArticle/{articleId}")
    @Transactional
    @ApiOperation(value = "喜欢文章")
    public BaseResponse LikeArticle(@PathVariable Integer articleId, HttpServletRequest request) {
        Integer userId = CheckAllow.checkAllow(userMessageOperationService, request);

        if (userId < 0) {
            return ResponseData.out(CodeEnum.SIGNATURE_NOT_ALLOW);
        }

        LikeMessage likeMessage = new LikeMessage();
        likeMessage.setArticleId(articleId);
        likeMessage.setUserId(userId);


        List<LikeMessage> list = likeArticleService.findList(likeMessage);

        if (list.size() == 0) {

            ArticleMessage articleMessage = articleOperationService.getById(articleId);
            articleMessage.setLikeCounter(articleMessage.getLikeCounter() + 1);
            articleOperationService.update(articleMessage);

            likeArticleService.add(likeMessage);

            LikeMessage likeMessage1 = likeArticleService.findList(likeMessage).get(0);

            ArticleMessage newArticleById = articleOperationService.getNewArticleById(articleId);

            NoticeMessage noticeMessage = new NoticeMessage();

            noticeMessage.setArticleId(articleId);

            noticeMessage.setNoticeType(2);
            noticeMessage.setUserId(newArticleById.getUserId());
            noticeMessage.setLikeId(likeMessage1.getLikeId());

            List<NoticeMessage> noticeMessages = noticeOperationService.findList(noticeMessage);

            //判断是不是自己

            //如果不是自己
            if (noticeMessages.size() == 0 && !newArticleById.getUserId().equals(userId)) {

                noticeMessage.setLikeId(likeMessage1.getLikeId());
                noticeOperationService.add(noticeMessage);
            }

        }
        // 如果like队列不为空
        else {
            ArticleMessage newArticleById = articleOperationService.getNewArticleById(articleId);

            NoticeMessage noticeMessage = new NoticeMessage();

            noticeMessage.setArticleId(articleId);

            noticeMessage.setNoticeType(2);
            noticeMessage.setUserId(newArticleById.getUserId());
            noticeMessage.setLikeId(list.get(0).getLikeId());

            ArticleMessage articleMessage = articleOperationService.getById(articleId);
            articleMessage.setLikeCounter(articleMessage.getLikeCounter() - 1);

            articleOperationService.update(articleMessage);
            likeArticleService.delete(likeMessage);
            noticeOperationService.delete(noticeMessage);
        }

        return ResponseData.success();
    }

    @PostMapping("/checkArticle/{articleId}")
    @Transactional
    @ApiOperation("举报文章")
    public BaseResponse checkArticle(@PathVariable Integer articleId, HttpServletRequest request) {
        UserMessage userMessage = new UserMessage();
        userMessage.setUserAdmin("2");

        Integer userId = CheckAllow.checkAllow(userMessageOperationService, request);

        if (userId < 0) {
            return ResponseData.out(CodeEnum.SIGNATURE_NOT_ALLOW);
        }

        List<UserMessage> list = userMessageOperationService.findList(userMessage);

        for (int i = 0; i < list.size(); i++) {
            NoticeMessage noticeMessage = new NoticeMessage();
            noticeMessage.setContent("我举报这篇文章,查看详情");
            noticeMessage.setNoticeType(6);
            noticeMessage.setArticleId(articleId);
            noticeMessage.setSendUserId(userId);
            noticeMessage.setUserId(list.get(i).getUserId());
            noticeOperationService.add(noticeMessage);
        }
        return ResponseData.success();
    }


}
