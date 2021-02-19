package com.example.jobhuntcms.ApplicationController;

import com.example.jobhuntcms.Database.JobListingRepository;
import com.example.jobhuntcms.Model.JobListing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


import javax.validation.Valid;
import javax.validation.constraints.Min;
import java.net.URI;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;


@RestController
@RequestMapping("/cms-storage")
@Validated
public class CMSController {
    private JobListingRepository jobListingRepo;

    @Autowired
    public CMSController(JobListingRepository jobListingRepo){
        this.jobListingRepo = jobListingRepo;
    }

    /**
     * POST mapping
     * @param jobListing
     * @return
     */
    @PostMapping("/jobListings")
    @CrossOrigin
    ResponseEntity createNewJobListing(@Valid @RequestBody JobListing jobListing){
        JobListing newJobListing = jobListingRepo.save(jobListing);
        jobListing.setPostingDate(getCurrentDate());
        jobListing.setJobStatus("Applied");
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(newJobListing.getId()).toUri();

        return ResponseEntity.created(location).build();
    }


    private String getCurrentDate(){
        LocalDate date = LocalDate.now();
        // Date format: MM-dd-yyyy
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd-yyyy");
        return date.format(formatter);
    }

    /**
     * GET mapping
     * @return all job listings in DB
     */
    @GetMapping("/jobListings")
    @CrossOrigin
    Iterable<JobListing> getAllJobListings(){
        return jobListingRepo.findAll();
    }

    /**
     * GET mapping
     * by id lookup
     * @param id
     * @return
     */
    @GetMapping("/jobListings/{id}")
    ResponseEntity getJobListingById(@PathVariable Integer id){
        JobListing foundJobListing = jobListingRepo.findById(id).get();
        return ResponseEntity.ok().body(foundJobListing);
    }

    /**
     * DELETE mapping
     * @return
     */
    @DeleteMapping("/jobListings/{id}")
    ResponseEntity deleteJobListing(@PathVariable Integer id){
        JobListing foundJobListing = jobListingRepo.findById(id).get();

        jobListingRepo.deleteById(foundJobListing.getId());
        return ResponseEntity.ok().body("Dog successfully deleted !");
    }
}
