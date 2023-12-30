package work.likecu.share.controller;

import com.github.pagehelper.PageInfo;
import io.swagger.annotations.ApiOperation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import work.likecu.share.model.CommentMessage;
//import work.likecu.share.model.Picture;
import work.likecu.share.model.SignRecord;
import work.likecu.share.model.SignUsers;
import work.likecu.share.service.*;
import work.likecu.share.util.status.BaseResponse;
import work.likecu.share.util.status.CodeEnum;
import work.likecu.share.util.status.ResponseData;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/wx/api")
public class GlobalDataController {
    /**
     * @Path: work\likecu\share\controller\GlobalDataController.java
     * @author: likecu
     * @create: 2022-05-28 20:30
     */

    @Resource
    private ArticleOperationService articleOperationService;
    @Resource
    private ThemeMessageOperationService themeMessageOperationService;

    @Resource
    private CommentService commentService;
    @Resource
    private ReplayMessageOperationService replayMessageOperationService;


    @GetMapping("/getNewArticle/{pageNumber}")
    @ApiOperation("获取最新文章")
    public BaseResponse getNewArticle(@PathVariable Integer pageNumber) {
        return ResponseData.success(articleOperationService.getNewArticle(pageNumber, null, null, null));
    }

    @GetMapping("/getNewArticleIsPublic/{pageNumber}")
    @ApiOperation("获取最新公开文章")
    public BaseResponse getNewArticleIsPublic(@PathVariable Integer pageNumber) {
        return ResponseData.success(articleOperationService.getNewArticle_isPublic(pageNumber, null, null, null, 1));
    }

    @GetMapping("/getNewArticleById/{articleId}")
    @ApiOperation("通过id获取文章")
    public BaseResponse getNewArticleById(@PathVariable Integer articleId) {
        return ResponseData.success(articleOperationService.getNewArticleById(articleId));
    }

    @GetMapping("/getCommentById/{articleId}/{pageNumber}")
    @ApiOperation("获取评论以及回复")
    public BaseResponse getCommentById(@PathVariable Integer articleId, @PathVariable Integer pageNumber) {
        List<CommentMessage> list = commentService.getCommentById(pageNumber, articleId).getList();
        for (CommentMessage commentMessage : list) {
            commentMessage.setReplayMessageList(replayMessageOperationService.getReplayContent(commentMessage.getCommentId()));
        }

        PageInfo<CommentMessage> of = PageInfo.of(list);
        return ResponseData.success(of);
    }

    @GetMapping("/getAllTheme")
    @ApiOperation("获取主题信息")
    public BaseResponse getAllTheme() {
        return ResponseData.success(themeMessageOperationService.getAllTheme(1));
    }

    @GetMapping("/getNewArticleByThemeId/{themeId}/{pageNumber}")
    @ApiOperation("通过主题获取文章")
    public BaseResponse getNewArticleByThemeId(@PathVariable Integer pageNumber, @PathVariable Integer themeId) {
        return ResponseData.success(articleOperationService.getNewArticle(pageNumber, null, themeId, null));
    }

    @GetMapping("/getAllLikeArticle/{pageNumber}")
    @ApiOperation("或者精选文章")
    public BaseResponse getAllLikeArticle(@PathVariable Integer pageNumber) {
        return ResponseData.success(articleOperationService.getAllLikeArticle(pageNumber));
    }

    @GetMapping("/getThemeId/{themeName}")
    @ApiOperation("通过主题获取主题id")
    public BaseResponse getNewArticleByThemeId(@PathVariable String themeName) {
        System.out.println(themeMessageOperationService.getThemeId(themeName));
        return ResponseData.success(themeMessageOperationService.getThemeId(themeName));
    }


}
