import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Project {
    id: string;
    title: string;
    category: 'Python' | 'Java' | 'JavaScript' | 'Hardware' | 'AI';
    image: string;
    link: string;
    description?: string;
}

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {
    private projects: Project[] = [
        {
            id: 'pokedex-python',
            title: 'Pokedex python API',
            category: 'Python',
            image: 'assets/images/python.png',
            link: 'pokedex/index.html',
            description: 'A Python-based API for retrieving Pokemon data.'
        },
        {
            id: 'java-game',
            title: 'Java Game',
            category: 'Java',
            image: 'assets/images/java.png',
            link: 'java/index.html',
            description: 'An interactive game built with Java.'
        },
        {
            id: 'personality-book-test',
            title: 'Personality book test',
            category: 'JavaScript',
            image: 'assets/images/javascript.png',
            link: 'https://llarjovecorresponsales.infinityfreeapp.com',
            description: 'A web application to test personality traits based on book preferences.'
        },
        {
            id: 'arduino-car',
            title: 'Arduino car project',
            category: 'Hardware',
            image: 'assets/images/arduino.png',
            link: 'arduino/index.html',
            description: 'A remote-controlled car powered by Arduino.'
        },
        {
            id: 'ai-chatbot',
            title: 'AI Chatbot Assistant',
            category: 'AI',
            image: 'assets/images/gemini.png',
            link: 'deepseek_api/index.html',
            description: 'An intelligent chatbot assistant powered by AI.'
        }
    ];

    constructor() { }

    getProjects(): Observable<Project[]> {
        return of(this.projects);
    }

    getProjectById(id: string): Observable<Project | undefined> {
        const project = this.projects.find(p => p.id === id);
        return of(project);
    }
}
