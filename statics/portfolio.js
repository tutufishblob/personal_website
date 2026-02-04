// Classes data
const classes = [
    {
        id: 1,
        code: "EECS 498",
        name: "System Design of a Search Engine",
        semester: "Winter 2026",
        description: "Worked in a group to tackle a large systems programming project. Implemented a complete internet search engine from scratch with our own index, web crawler, query optimizer, and ranker",
        projects: [
            {
                title: "Distributed Multi-Threaded Web Crawler",
                date: "February 2026",
                description: "Implemented an LLVM pass that performs aggressive loop optimizations including loop unrolling, vectorization, and strength reduction. Achieved 40% performance improvement on matrix multiplication benchmarks.",
                tags: ["C++", "PThread", "Sockets"],
                highlights: []
            },
            {
                title: "Ranker",
                date: "March 2026",
                description: "Built a custom static analyzer to detect memory safety violations in C programs. Uses abstract interpretation and symbolic execution to identify potential buffer overflows and use-after-free bugs.",
                tags: ["Static Analysis", "Python", "Security"],
                highlights: ["Abstract interpretation", "Bug detection", "Program analysis"]
            }
        ]
    },
    {
        id: 2,
        code: "EECS 485",
        name: "Web Systems",
        semester: "Winter 2026",
        description: "Built scalable web applications while covering client/server protocols, security, information retrieval, search engines, and scalable data processing ",
        projects: [
            {
                title: "Instagram Clone ",
                date: "January 2026",
                description: "",
                tags: ["HTML", "CSS", "JavaScript", "Flask", "Python"],
                highlights: ["Client Side Dynamic Website", "Server Side Dynamic Website"]
            },
            // {
            //     title: "Map Reduce",
            //     date: "March 2026",
            //     description: "Built a custom static analyzer to detect memory safety violations in C programs. Uses abstract interpretation and symbolic execution to identify potential buffer overflows and use-after-free bugs.",
            //     tags: ["Static Analysis", "Python", "Security"],
            //     highlights: ["Abstract interpretation", "Bug detection", "Program analysis"]
            // },
            // {
            //     title: "Toy Search Engine",
            //     date: "March 2026",
            //     description: "Designed and implemented a just-in-time compiler for a domain-specific language targeting numerical computations. Integrated with LLVM's ORC JIT for runtime code generation.",
            //     tags: ["JIT", "LLVM", "DSL"],
            //     highlights: ["Runtime compilation", "Code generation", "Performance"]
            // }
        ]
    },
    {
        id: 3,
        code: "EECS 449",
        name: "Conversational AI",
        semester: "Winter 2026",
        description: "Deep dive into compiler optimization, program analysis, and intermediate representations",
        projects: [
            {
                title: "LLVM-based Loop Optimizer",
                date: "November 2024",
                description: "Implemented an LLVM pass that performs aggressive loop optimizations including loop unrolling, vectorization, and strength reduction. Achieved 40% performance improvement on matrix multiplication benchmarks.",
                tags: ["LLVM", "C++", "Optimization"],
                highlights: ["Loop analysis", "Performance tuning", "Benchmarking"]
            },
        ]
    },
    {
        id: 4,
        code: "MATH  423",
        name: "Mathematics of Finance",
        semester: "Fall 2025",
        description: "Deep dive into compiler optimization, program analysis, and intermediate representations",
    },
    {
        id: 5,
        code: "EECS 482 + 408",
        name: "Operating Systems (Advanced Section)",
        semester: "Fall 2025",
        description: "Building scalable ML infrastructure, distributed training, and model deployment",
        projects: [
            {
                title: "Distributed Training Framework",
                date: "November 2024",
                description: "Created a distributed training system supporting data parallelism and model parallelism across multiple GPUs. Implemented gradient compression and efficient parameter server architecture.",
                tags: ["PyTorch", "Distributed Systems", "Python"],
                highlights: ["Multi-GPU training", "Communication optimization", "Scalability"]
            },
            {
                title: "Model Serving Pipeline",
                date: "October 2024",
                description: "Built an end-to-end ML serving pipeline with automatic model versioning, A/B testing capabilities, and real-time inference API. Handles 1000+ requests per second with sub-100ms latency.",
                tags: ["FastAPI", "Docker", "Kubernetes"],
                highlights: ["Low latency", "Load balancing", "Model versioning"]
            }
        ]
    },
    {
        id: 6,
        code: "EECS 583",
        name: "Advanced Compilers",
        semester: "Fall 2025",
        description: "Deep dive into compiler optimization, program analysis, and intermediate representations",
        projects: [
            {
                title: "LLVM-based Loop Optimizer",
                date: "November 2024",
                description: "Implemented an LLVM pass that performs aggressive loop optimizations including loop unrolling, vectorization, and strength reduction. Achieved 40% performance improvement on matrix multiplication benchmarks.",
                tags: ["LLVM", "C++", "Optimization"],
                highlights: ["Loop analysis", "Performance tuning", "Benchmarking"]
            },
            {
                title: "Static Analysis Tool for Memory Safety",
                date: "October 2024",
                description: "Built a custom static analyzer to detect memory safety violations in C programs. Uses abstract interpretation and symbolic execution to identify potential buffer overflows and use-after-free bugs.",
                tags: ["Static Analysis", "Python", "Security"],
                highlights: ["Abstract interpretation", "Bug detection", "Program analysis"]
            },
            {
                title: "JIT Compiler for Custom DSL",
                date: "December 2024",
                description: "Designed and implemented a just-in-time compiler for a domain-specific language targeting numerical computations. Integrated with LLVM's ORC JIT for runtime code generation.",
                tags: ["JIT", "LLVM", "DSL"],
                highlights: ["Runtime compilation", "Code generation", "Performance"]
            }
        ]
    },
    {
        id: 7,
        code: "EECS 484",
        name: "Database Management Systems",
        semester: "Fall 2025",
        description: "Core OS concepts: processes, memory management, file systems, and concurrency",
        projects: [
            {
                title: "Custom Memory Allocator",
                date: "April 2024",
                description: "Implemented a high-performance memory allocator using segregated free lists and boundary tag coalescing. Outperformed standard malloc on allocation-heavy workloads by 25%.",
                tags: ["C", "Memory Management", "Performance"],
                highlights: ["Free list management", "Fragmentation reduction", "Benchmarking"]
            },
            {
                title: "Multi-threaded Web Server",
                date: "March 2024",
                description: "Built a concurrent web server handling HTTP/1.1 requests with thread pooling, request parsing, and static file serving. Implemented producer-consumer pattern for request handling.",
                tags: ["C", "Networking", "Concurrency"],
                highlights: ["Thread synchronization", "Socket programming", "HTTP protocol"]
            },
            {
                title: "File System Implementation",
                date: "May 2024",
                description: "Developed a Unix-like file system with support for directories, inodes, and indirect blocks. Implemented journaling for crash recovery and consistency.",
                tags: ["C", "File Systems", "Storage"],
                highlights: ["Inode management", "Crash recovery", "Block allocation"]
            }
        ]
    },
    {
        id: 8,
        code: "EECS 491",
        name: "Distributed Systems",
        semester: "Winter 2025",
        description: "Advanced algorithmic techniques including dynamic programming, graph algorithms, and NP-completeness",
        projects: [
            {
                title: "Network Flow Optimization",
                date: "April 2024",
                description: "Implemented and compared max-flow algorithms (Ford-Fulkerson, Edmonds-Karp, Push-Relabel) for solving real-world transportation and matching problems. Analyzed time complexity trade-offs.",
                tags: ["Python", "Graph Theory", "Optimization"],
                highlights: ["Max-flow algorithms", "Performance analysis", "Real-world applications"]
            },
            {
                title: "Approximation Algorithms Study",
                date: "May 2024",
                description: "Explored approximation algorithms for NP-hard problems including TSP, vertex cover, and set cover. Implemented greedy and LP-rounding approaches with theoretical guarantees.",
                tags: ["Python", "Approximation", "Complexity Theory"],
                highlights: ["NP-hard problems", "Approximation ratios", "Theoretical analysis"]
            }
        ]
    },
    {
        id: 9,
        code: "EECS 445",
        name: "Machine Learning",
        semester: "Winter 2025",
        description: "Functional programming paradigms, type systems, and language design using OCaml",
        projects: [
            {
                title: "OCaml Chess Engine",
                date: "December 2023",
                description: "Developed a fully functional chess engine with move generation, board evaluation, and minimax with alpha-beta pruning. Implemented using immutable data structures and algebraic data types.",
                tags: ["OCaml", "Game AI", "Functional Programming"],
                highlights: ["Immutable design", "Type safety", "Game logic"]
            },
            {
                title: "Type Inference Engine",
                date: "November 2023",
                description: "Built a Hindley-Milner type inference engine for a simple functional language. Supports polymorphic types, let-polymorphism, and generates human-readable type error messages.",
                tags: ["OCaml", "Type Theory", "Compilers"],
                highlights: ["Type inference", "Polymorphism", "Error reporting"]
            }
        ]
    },
    {
        id: 10,
        code: "EECS 370",
        name: "Computer Organization",
        semester: "Winter 2025",
        description: "Deep dive into compiler optimization, program analysis, and intermediate representations",
        projects: [
            {
                title: "LLVM-based Loop Optimizer",
                date: "November 2024",
                description: "Implemented an LLVM pass that performs aggressive loop optimizations including loop unrolling, vectorization, and strength reduction. Achieved 40% performance improvement on matrix multiplication benchmarks.",
                tags: ["LLVM", "C++", "Optimization"],
                highlights: ["Loop analysis", "Performance tuning", "Benchmarking"]
            },
            {
                title: "Static Analysis Tool for Memory Safety",
                date: "October 2024",
                description: "Built a custom static analyzer to detect memory safety violations in C programs. Uses abstract interpretation and symbolic execution to identify potential buffer overflows and use-after-free bugs.",
                tags: ["Static Analysis", "Python", "Security"],
                highlights: ["Abstract interpretation", "Bug detection", "Program analysis"]
            },
            {
                title: "JIT Compiler for Custom DSL",
                date: "December 2024",
                description: "Designed and implemented a just-in-time compiler for a domain-specific language targeting numerical computations. Integrated with LLVM's ORC JIT for runtime code generation.",
                tags: ["JIT", "LLVM", "DSL"],
                highlights: ["Runtime compilation", "Code generation", "Performance"]
            }
        ]
    },
    {
        id: 11,
        code: "EECS 281",
        name: "Data Structures & Algorithms",
        semester: "Fall 2024",
        description: "Deep dive into compiler optimization, program analysis, and intermediate representations",
        projects: [
            {
                title: "LLVM-based Loop Optimizer",
                date: "November 2024",
                description: "Implemented an LLVM pass that performs aggressive loop optimizations including loop unrolling, vectorization, and strength reduction. Achieved 40% performance improvement on matrix multiplication benchmarks.",
                tags: ["LLVM", "C++", "Optimization"],
                highlights: ["Loop analysis", "Performance tuning", "Benchmarking"]
            },
            {
                title: "Static Analysis Tool for Memory Safety",
                date: "October 2024",
                description: "Built a custom static analyzer to detect memory safety violations in C programs. Uses abstract interpretation and symbolic execution to identify potential buffer overflows and use-after-free bugs.",
                tags: ["Static Analysis", "Python", "Security"],
                highlights: ["Abstract interpretation", "Bug detection", "Program analysis"]
            },
            {
                title: "JIT Compiler for Custom DSL",
                date: "December 2024",
                description: "Designed and implemented a just-in-time compiler for a domain-specific language targeting numerical computations. Integrated with LLVM's ORC JIT for runtime code generation.",
                tags: ["JIT", "LLVM", "DSL"],
                highlights: ["Runtime compilation", "Code generation", "Performance"]
            }
        ]
    },
    {
        id: 12,
        code: "EECS 280",
        name: "Programming and Introduction to Data Structures",
        semester: "Winter 2024",
        description: "Deep dive into compiler optimization, program analysis, and intermediate representations",
        projects: [
            {
                title: "LLVM-based Loop Optimizer",
                date: "November 2024",
                description: "Implemented an LLVM pass that performs aggressive loop optimizations including loop unrolling, vectorization, and strength reduction. Achieved 40% performance improvement on matrix multiplication benchmarks.",
                tags: ["LLVM", "C++", "Optimization"],
                highlights: ["Loop analysis", "Performance tuning", "Benchmarking"]
            },
            {
                title: "Static Analysis Tool for Memory Safety",
                date: "October 2024",
                description: "Built a custom static analyzer to detect memory safety violations in C programs. Uses abstract interpretation and symbolic execution to identify potential buffer overflows and use-after-free bugs.",
                tags: ["Static Analysis", "Python", "Security"],
                highlights: ["Abstract interpretation", "Bug detection", "Program analysis"]
            },
            {
                title: "JIT Compiler for Custom DSL",
                date: "December 2024",
                description: "Designed and implemented a just-in-time compiler for a domain-specific language targeting numerical computations. Integrated with LLVM's ORC JIT for runtime code generation.",
                tags: ["JIT", "LLVM", "DSL"],
                highlights: ["Runtime compilation", "Code generation", "Performance"]
            }
        ]
    }
];

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    sunIcon.classList.toggle('hidden');
    moonIcon.classList.toggle('hidden');
});

// Render classes
const classesContainer = document.getElementById('classesContainer');

function createChevronSVG(expanded) {
    return `
        <svg class="chevron ${expanded ? 'expanded' : ''}" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    `;
}

function createCalendarSVG() {
    return `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
    `;
}

function createTagSVG() {
    return `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
            <line x1="7" y1="7" x2="7.01" y2="7"></line>
        </svg>
    `;
}

function renderProjects(projects) {
    return projects.map(project => `
    <div class="project-post">
        <div class="project-header">
            <h4 class="class-title">${project.title}</h4>
            <div class="project-date mono">
                ${createCalendarSVG()}
                ${project.date}
            </div>
        </div>

        <p class="description">${project.description}</p>

        ${
            project.highlights && project.highlights.length
                ? `
                    <div class="highlights">
                        <p class="highlights-title">Key Highlights:</p>
                        <ul>
                            ${project.highlights.map(h => `<li>${h}</li>`).join('')}
                        </ul>
                    </div>
                `
                : ''
        }

        <div class="tags">
            ${project.tags.map(tag => `
                <span class="tag mono">
                    ${createTagSVG()}
                    ${tag}
                </span>
            `).join('')}
        </div>
    </div>
`).join('');
}

function toggleClass(classId) {
    const classCard = document.querySelector(`[data-class-id="${classId}"]`);
    const projectsList = classCard.querySelector('.projects-list');
    const chevron = classCard.querySelector('.chevron');
    
    if (projectsList) {
        // Close it
        projectsList.remove();
        chevron.classList.remove('expanded');
    } else {
        // Open it
        const course = classes.find(c => c.id === classId);
        const projectsHTML = `<div class="projects-list">${renderProjects(course.projects)}</div>`;
        classCard.insertAdjacentHTML('beforeend', projectsHTML);
        chevron.classList.add('expanded');
    }
}

classes.forEach(course => {
    const classCard = document.createElement('div');
    classCard.className = 'class-card';
    classCard.setAttribute('data-class-id', course.id);
    
    classCard.innerHTML = `
        <div class="class-header">
            <div class="class-info">
                <div class="class-meta">
                    <span class="class-code mono">${course.code}</span>
                    <span class="class-semester mono">${course.semester}</span>
                </div>
                <h3 class="class-title">${course.name}</h3>
                <p class="class-description">${course.description}</p>
                <p class="class-project-count mono">${course.projects.length} project${course.projects.length !== 1 ? 's' : ''}</p>
            </div>
            ${createChevronSVG(false)}
        </div>
    `;

    
    
    classCard.addEventListener('click', () => toggleClass(course.id));
    classesContainer.appendChild(classCard);
});
