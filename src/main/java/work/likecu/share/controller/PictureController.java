package work.likecu.share.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import work.likecu.share.model.Hashcode;
import work.likecu.share.service.FileService;
import work.likecu.share.service.HashcodeControlService;
import work.likecu.share.service.UserMessageOperationService;
import work.likecu.share.util.CheckAllow;
import work.likecu.share.util.ImageUtil;
import work.likecu.share.util.status.BaseResponse;
import work.likecu.share.util.status.ResponseData;
import work.likecu.share.model.uploadWeb;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Date;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/wx1")
public class PictureController {


    @Autowired
    FileService fileService;

    @Autowired
    private HashcodeControlService hashcodeControlService;
    @Resource
    private UserMessageOperationService userMessageOperationService;

    @PostMapping("/upload")
    public BaseResponse upload(@RequestParam("file") MultipartFile multipartFile, HttpServletRequest request) throws Exception {

//        Map<String,String[]> a=request.getParameterMap();
//        System.out.println("通过Map.keySet遍历key和value：");
//        for (String key : a.keySet()) {
//            System.out.println("key= "+ key + " and value= " + Arrays.toString(a.get(key)));
//        }
//        System.out.println();
//        log.info("save file name {}",a.get("key")[0]);
//        //转成成文件
//        File file = null;
//        try {
//            String originalFilename = multipartFile.getOriginalFilename();
//            String[] filename = originalFilename.split("\\.");
//            file=File.createTempFile(filename[0], filename[1]);
//            multipartFile.transferTo(file);
//            file.deleteOnExit();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//
//        //转换成数组
//        byte[] buffer = null;
//        try
//        {
//            FileInputStream fis = new FileInputStream(file);
//            ByteArrayOutputStream bos = new ByteArrayOutputStream();
//            byte[] b = new byte[1024];
//            int n;
//            while ((n = fis.read(b)) != -1)
//            {
//                bos.write(b, 0, n);
//            }
//            fis.close();
//            bos.close();
//            buffer = bos.toByteArray();
//        } catch (IOException e){
//            e.printStackTrace();
//        }
//
//        System.out.println(buffer.length);

        //计算哈希码
        byte[] buffer = multipartFile.getBytes();
        String hash = uploadWeb.hashFile(buffer);
        System.out.println(hash);
        Hashcode hashcode = new Hashcode();
        hashcode.setCode(hash);
        List<Hashcode> hashcodeList = hashcodeControlService.findList(hashcode);

        //如果哈希码存在，则不上传
        if (hashcodeList.size() == 1) {
            return ResponseData.success(hashcodeList.get(0).getUrl());
        }

        double a = Math.sqrt((double) buffer.length / 500/ 1024)  ;
        if (a > 2) {
            String originalFilename = multipartFile.getOriginalFilename();

            buffer=ImageUtil.InputImage(multipartFile,a,originalFilename);
        }

        //哈希码不存在，进行上传
        String filePath;
        try {
            long upload=new Date().getTime();
            filePath = uploadWeb.uploadByteArray(buffer);
            long upload2=new Date().getTime();
            System.out.println("文件上传时间："+(upload2-upload));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        //写入到表中
        filePath = filePath.replaceAll("\"", "");
        hashcode.setUrl(filePath);
        hashcodeControlService.add(hashcode);

        return ResponseData.success(filePath);
    }

    @GetMapping("/file/{fileName}/{fileName1}/{fileName2}")
    public BaseResponse downloadFile(HttpServletResponse response,
                                     @PathVariable String fileName, @PathVariable String fileName1, @PathVariable String fileName2) {

        Boolean result = fileService.downloadFile(response, fileName + "/" + fileName1 + "/" + fileName2);

        return ResponseData.success(result);
    }

    @GetMapping("/list")
    public BaseResponse list(HttpServletRequest request) {
        Integer userId = CheckAllow.checkAllow(userMessageOperationService, request);
        return ResponseData.success(fileService.getFiles());
    }

}