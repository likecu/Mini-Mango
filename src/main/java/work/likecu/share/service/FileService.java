package work.likecu.share.service;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;
import work.likecu.share.model.uploadWeb;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.InetAddress;
import java.net.URLEncoder;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class FileService {

    @Value("${server.port}")
    private String port;

    @Value("${server.servlet.context-path}")
    private String contextPath;

    @Value("${pic.dir}")
    private String picDir;


    public String saveFile(MultipartFile multipartFile, String filename, uploadWeb uploadWebs ) throws IOException {
        System.out.println(multipartFile.getBytes().length);
//        String[] strings=filename.split("/");
//        String path=picDir +strings[0]+"/"+strings[1];
//        File file = new File(path);
//        System.out.println(path);
//        System.out.println(file.mkdirs());
//
//
//
//        File file1 = new File(picDir + filename);
//        try {
//            multipartFile.transferTo(file1);
//        } catch (IOException e) {
//            log.error("save file error,{}", e.getMessage());
//            return "";
//        }
        String string=uploadWebs.uploadByteArray(multipartFile.getBytes());

        return string;
    }

    public List<String> getFiles() {
        List<String> fileUrls = new ArrayList<>();

        File file = new File(picDir);
        if (file.isDirectory()) {
            File[] files = file.listFiles();
            if (files != null) {
                for (File file1 : files) {
                    fileUrls.add(getFileUrl(file1.getName()));
                }
            }
        }
        return fileUrls;
    }

    public String getFileUrl(String fileName) {
        try {
            InetAddress address = InetAddress.getLocalHost();
            String fileUrl = "http://" + address.getHostAddress() + ":" + port + contextPath + "/file/" + fileName;
            log.info("fileUrl:{}", fileUrl);
            return fileUrl;
        } catch (UnknownHostException e) {
            log.error("get host error,{}", e.getMessage());
            return "";
        }
    }

    public Boolean downloadFile(HttpServletResponse response, String fileName) {
        File file = new File(picDir + fileName);
        if (file.exists()) {
            try {
                FileInputStream fileInputStream = new FileInputStream(file);

                response.setHeader("content-disposition", "attachment;fileName=" + URLEncoder.encode(fileName, "UTF-8"));
                ServletOutputStream outputStream = response.getOutputStream();

                FileCopyUtils.copy(fileInputStream, outputStream);
                return true;
            } catch (IOException e) {
                log.error("download file error: {}", e.getMessage());
                return false;
            }
        }
        return false;
    }

}

