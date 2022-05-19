package work.likecu.share.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import work.likecu.share.service.FileService;
import work.likecu.share.service.UserMessageOperationService;
import work.likecu.share.util.CheckAllow;
import work.likecu.share.util.status.BaseResponse;
import work.likecu.share.util.status.CodeEnum;
import work.likecu.share.util.status.ResponseData;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/wx1")
public class PictureController {

    @Autowired
    FileService fileService;

    @Resource
    private UserMessageOperationService userMessageOperationService;

    @PostMapping("/upload")
    public BaseResponse upload(@RequestParam("file") MultipartFile file,HttpServletRequest request) {

        Map<String,String[]> a=request.getParameterMap();
//        System.out.println("通过Map.keySet遍历key和value：");
//        for (String key : a.keySet()) {
//            System.out.println("key= "+ key + " and value= " + Arrays.toString(a.get(key)));
//        }
//        System.out.println();
//        log.info("save file name {}",a.get("key")[0]);
        String filePath = fileService.saveFile(file, a.get("key")[0]);
        return ResponseData.success(filePath);
    }

    @GetMapping("/file/{fileName}/{fileName1}/{fileName2}")
    public BaseResponse downloadFile(HttpServletResponse response,
                                   @PathVariable String fileName,@PathVariable String fileName1,@PathVariable String fileName2) {

        Boolean result = fileService.downloadFile(response, fileName+"/"+fileName1+"/"+fileName2);

        return ResponseData.success(result);
    }

    @GetMapping("/list")
    public BaseResponse list(HttpServletRequest request) {
        Integer userId = CheckAllow.checkAllow(userMessageOperationService, request);
        return ResponseData.success(fileService.getFiles());
    }

}