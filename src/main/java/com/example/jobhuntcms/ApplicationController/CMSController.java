package com.example.jobhuntcms.ApplicationController;

import com.example.jobhuntcms.Database.JobListingRepository;
import com.example.jobhuntcms.Model.JobListing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.ModelAttribute;

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

    @PostMapping("/append-job-listing")
    @CrossOrigin
    public String appendNewJobListing(@RequestParam String company, @RequestParam String position, @RequestParam String city, @RequestParam String state, @RequestParam String country, @RequestParam String platform, @RequestParam String description, @RequestParam String requirements, @RequestParam String jobStatus) {
        JobListing jobListing = new JobListing();
        jobListing.setCompany(company);
        jobListing.setPosition(position);
        jobListing.setCity(city);
        jobListing.setState(state);
        jobListing.setCountry(country);
        jobListing.setPlatform(platform);
        jobListing.setDescription(description);
        jobListing.setRequirements(requirements);
        jobListing.setPostingDate(getCurrentDate());
        jobListing.setJobStatus(jobStatus);
        jobListingRepository.save(jobListing);
        return "Saved !";
    }

//    @RequestMapping(value = "/append-job-listing", method = RequestMethod.POST)
//    public String appendNewJobListing(@ModelAttribute("jobListing") JobListing jobListing, Model model){
//        jobListing.setPostingDate(getCurrentDate());
//        model.addAttribute("jobListing", jobListing);
//        jobListingRepository.save(jobListing);
//        return "Saved !";
//    }

//    @PostMapping("/append-job-listing")
//    public String appendNewJobListing(@ModelAttribute("jobListing") JobListing jobListing, Model model){
//        jobListing.setPostingDate(getCurrentDate());
//        jobListing.setJobStatus("Applied");
//        model.addAttribute("jobListing", jobListing);
//        jobListingRepository.save(jobListing);
//        return "form_submission_result";
//    }

//    @GetMapping("/append-job-listing")
//    public String appendNewJobListingForm(Model model){
//        model.addAttribute("jobListing", new JobListing());
//        return "form";
//    }

//    @GetMapping("/table-results")
//    public String viewTableResults(){
//        return "index";
//    }

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
