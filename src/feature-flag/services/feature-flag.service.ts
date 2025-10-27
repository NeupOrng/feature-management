import { Injectable } from "@nestjs/common";
import { ProjectRepository } from "../repository/project.repository";

@Injectable()
export class FeatureFlagService {
    constructor(
        private readonly projectRepository: ProjectRepository
    ) {}

    
}