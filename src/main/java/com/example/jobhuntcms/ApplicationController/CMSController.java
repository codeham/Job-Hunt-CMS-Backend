package com.example.jobhuntcms.ApplicationController;

import com.example.jobhuntcms.Database.JobListingRepository;
import com.example.jobhuntcms.Model.JobListing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/cms-storage")
public class CMSController {
    @Autowired
    private JobListingRepository jobListingRepository;

//    @RequestMapping("/")
//    public String index(){
//        // spit out our website
//        return "index.html";
//    }

    @PostMapping(value = "/append-job-listing", consumes = "application/json", produces = "application/json")
    @CrossOrigin
    public String testAPI(@RequestBody JobListing jobListing){
        jobListing.setPostingDate(getCurrentDate());
        jobListing.setJobStatus("Applied");
        System.out.println(jobListing.getCompany());
        jobListingRepository.save(jobListing);
        return "Saved !";
    }

    public String validateEmpty(String word){
        if(word.length() == 0){
            return null;
        }
        return word;
    }

    private String getCurrentDate(){
        LocalDate date = LocalDate.now();
        // Date format: MM-dd-yyyy
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd-yyyy");
        return date.format(formatter);
    }

    @GetMapping("/all-job-listings")
    @CrossOrigin
    public @ResponseBody Iterable<JobListing> getMasterTable(){
        return jobListingRepository.findAll();
    }

    @GetMapping("/job-listing")
    public String getJobListing(){
        return null;
    }

    @DeleteMapping("/job-listing/delete")
    public String deleteListing(){
        return null;
    }
}
