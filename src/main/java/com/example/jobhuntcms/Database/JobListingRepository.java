package com.example.jobhuntcms.Database;

import com.example.jobhuntcms.Model.JobListing;
import org.springframework.data.repository.CrudRepository;

public interface JobListingRepository extends CrudRepository<JobListing, Integer> {}
