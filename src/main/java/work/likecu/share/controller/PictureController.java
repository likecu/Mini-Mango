package work.likecu.share.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import work.likecu.share.service.FileService;
import work.likecu.share.util.status.BaseResponse;
import work.likecu.share.util.status.ResponseData;

import javax.servlet.http.HttpServletResponse;

@Slf4j
@RestController
@RequestMapping("/pictureService")
public class PictureController {

    @Autowired
    FileService fileService;

    @PostMapping("/upload")
    public BaseResponse upload(@RequestParam("media") MultipartFile file) {
        log.info("save file name {}", file.getOriginalFilename());
        String filePath = fileService.saveFile(file);
        return ResponseData.success(filePath);
    }

    @GetMapping("/download")
    public BaseResponse downloadFile(HttpServletResponse response,
                                   @RequestParam(value = "fileName") String fileName) {

        Boolean result = fileService.downloadFile(response, fileName);
        return ResponseData.success(result);
    }

    @GetMapping("/list")
    public BaseResponse list() {
        return ResponseData.success(fileService.getFiles());
    }

}