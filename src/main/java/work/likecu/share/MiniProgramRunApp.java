package work.likecu.share;

import org.apache.http.entity.ContentType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import tk.mybatis.spring.annotation.MapperScan;
import work.likecu.share.util.FileUpload;
import work.likecu.share.util.uploadWeb;

import java.io.IOException;

@SpringBootApplication
@ServletComponentScan(basePackages = "work.likecu.share.*")
@MapperScan(basePackages = "work.likecu.share.mapper")
@EnableTransactionManagement
public class MiniProgramRunApp extends SpringBootServletInitializer {


    public static void main(String[] args) throws IOException {
//        SpringApplication.run(MiniProgramRunApp.class, args);
        uploadWeb.initSession();
        byte[] a= FileUpload.getBytesByFile("C:\\Users\\25406\\Desktop\\scut\\pingcs\\psc4.jpg");
        System.out.println(uploadWeb.upload(a,"psc3.jpg", ContentType.IMAGE_JPEG).getAsJsonObject("image").get("url"));
    }
//    /**
//     * 以下为Tomcat启动
//     *
//     * @param application
//     * @return
//     */


//    @Override
//    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
//        return application.sources(MiniProgramRunApp.class);
//    }
//
//    public static void main(String[] args) {
//        SpringApplication.run(MiniProgramRunApp.class, args);
//    }

}




