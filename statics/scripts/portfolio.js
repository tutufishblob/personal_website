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
                date: "Winter 2026",
                description: "Designed and implemented a distributed web crawler capable of efficiently indexing millions of web pages across multiple machines. The system uses multi-threading for concurrent fetching and a distributed task queue to balance crawling workloads. It handles network failures gracefully, ensures URL deduplication, and respects polite crawling policies. The crawler writes results into a central index for downstream ranking.",
                tags: ["C++", "PThread", "Sockets"],
                highlights: ["Distributed architecture with multiple crawler nodes", "Multi-threaded page fetching for high throughput", "Fault-tolerant network handling"]
            },
            {
                title: "Ranker",
                date: "Winter 2026",
                description: "Built a dynamic search result ranker that scores pages based on query-dependent relevance and contextual signals. The system combines factors such as page authority, link structure, content relevance, and freshness to compute scores in near real-time. Designed for modularity, enabling new ranking features to be added easily and supporting fast updates as new pages are indexed.",
                tags: ["C++", "Heuristic Algorithms"],
                highlights: ["Query-sensitive ranking", "Incorporates freshness and link structure in ranking"]
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
                title: "Instagram Clone",
                date: "January 2026",
                description: "Iteratively developed an instagram clone, first as a static web page, then dynamic server side, and finally as a client side dynamic page.",
                tags: ["HTML", "CSS", "JavaScript", "Flask", "Python"],
                highlights: ["Client Side Dynamic Web Pages", "Server Side Dynamic Web Pages"]
            }
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
        name: "Generative and Agentic Artificial Intelligence",
        semester: "Winter 2026",
        description: "Create an agentic software solution leveraging modern GenAI models and prompted contextual agentic software engineering.",
        projects: [
            {
                title: "Full-Stack Agentic AI Platform",
                date: "Winter 2026",
                description: "Built and marketed a full-stack application that used agentic AI",
                tags: ["Kubernetes", "Jaseci", "FastAPI"],
                highlights: ["Agentic AI", "Full-Stack"]
            }
            // {
            //     title: "Map Reduce",
            //     date: "March 2026",
            //     description: "Built a custom static analyzer to detect memory safety violations in C programs. Uses abstract interpretation and symbolic execution to identify potential buffer overflows and use-after-free bugs.",
            //     tags: ["Static Analysis", "Python", "Security"],
            //     highlights: ["Abstract interpretation", "Bug detection", "Program analysis"]
            // },
        ]
    },
    {
        id: 4,
        code: "EECS 482 + 408",
        name: "Operating Systems (Advanced Section)",
        semester: "Fall 2025",
        description: "Deep dive into operating systems design and implementation. Explored operating systems topics such as concurrency and synchronization, inter-process communication, memory and storage management, and file systems",
        projects: [
            {
                title: "Multi-Threaded Network File Server",
                date: "November 2025",
                description: "Built a concurrent, crash-consistent network file server with TCP socket communication, supporting multiple simultaneous users with nested directories. Implemented fine-grained reader-writer locking with hand-over-hand traversal for safe concurrent access, and ensured crash consistency through carefully ordered disk writes.",
                tags: ["C++", "Boost Mutexes", "Sockets"],
                highlights: ["Inode Management", "Networks", "Crash-Consistency"]
            },
            {
                title: "Virtual Memory Pager",
                date: "November 2025",
                description: "Designed a demand-paged virtual memory system supporting, multiple processes with swap-backed and file-backed pages. Implemented copy-on-write optimization for fork(), clock page replacement with eager swap reservation and efficient fault handling with deferred work to minimize disk I/O and page copies.",
                tags: ["C++", "Virtual Memory"],
                highlights: ["Copy-on-Write", "Swap-Backed & File-Backed Pages"]
            },
            {
                title: "Thread Library",
                date: "October 2025",
                description: "Developed a preemptive, kernel-level thread library supporting multiple CPUs with timer interrupts. Implemented context switching via u_context, synchronization primitives (mutexes, condition variables) with proper interrupt management, and FIFO scheduling with CPU suspend/resume for efficient resource utilization.",
                tags: ["C++", "Linux Kernel", "Concurrency"],
                highlights: ["Multi-Processor", "Interrupt Handling", "Synchronization Primitives"]
            }
        ]
    },
    {
        id: 5,
        code: "EECS 583",
        name: "Advanced Compilers",
        semester: "Fall 2025",
        description: "In-depth study on compiler backend design. Covered topics such as instruction scheduling, register allocation, memory heirarchy management, instruction-level parallelism, as well as predicated and speculative execution.",
        projects: [
            {
                title: "Automatic Speculative Hint Insertion for PyPy JIT Compiler",
                date: "November 2025",
                description: "Built a custom PyPy profiling and optimization pass. Profile pass detects near constant values throughout a program, optimization pass uses the profile data to speculatively insert Promote() and @elidable hints into a program.",
                tags: ["PyPy", "Python", "Optimization"],
                highlights: ["Hot Path detection", "Program analysis"]
            },
            {
                title: "LLVM-based Speculative Loop Optimizer",
                date: "October 2025",
                description: "Implemented an LLVM pass that performs speculative loop invariant code motion given a specific threshold value. Achieved up to 20% performance improvements on a variety of benchmarks",
                tags: ["LLVM", "C++", "Optimization"],
                highlights: ["Loop analysis", "Performance tuning", "Profiling"]
            }
        ]
    },
    {
        id: 6,
        code: "EECS 484",
        name: "Database Management Systems",
        semester: "Fall 2025",
        description: "Concepts and methods for the design creation, query and management of large enterprise databases.",
        projects: [
            {
                title: "Grace-Hash Join",
                date: "November 2025",
                description: "Implemented the Grace Hash Join algorithm in C++ for joining large relations that exceed main memory. Designed partitioning and probing phases using disk-backed buffers, minimized random I/O, and handled skewed data distributions to maintain performance under limited memory constraints.",
                tags: ["C++", "I/O Optimization", "Performance"],
                highlights: ["Efficient Join Algorithms", "Dynamic Memory Paging"]
            },
            {
                title: "MongoDB Database",
                date: "October 2025",
                description: "Worked with an existing MongoDB database to design and execute structured queries over large collections of document-based data. Wrote JavaScript queries to filter, aggregate, and analyze stored data, focusing on efficient data retrieval and correct query semantics.",
                tags: ["MongoDB", "JavaScript", "NoSQL"],
                highlights: ["Document-based data model", "NoSQL query design", "Aggregation pipelines"]
            },
            {
                title: "Java Integrated SQL Querying",
                date: "September 2025",
                description: "Developed a Java-based system that integrates SQL querying over structured datasets, including query parsing, execution planning, and secure data access. Implemented joins, filtering, and aggregation while enforcing access controls and safe query execution.",
                tags: ["Java", "SQL", "Security"],
                highlights: ["Relational database design", "Secure data access", "SQL query parsing & execution"]
            }
        ]
    },
    {
        id: 7,
        code: "EECS 491",
        name: "Distributed Systems",
        semester: "Winter 2025",
        description: "Design and Implementation of scalable, performant, and reliable distributed systems.",
        projects: [
            {
                title: "Sharded Key/Value Service with Paxos Groups",
                date: "March 2025",
                description: "Built a fault-tolerant, sharded key/value store in Go with dynamic shard migration across Paxos-replicated groups. Implemented a shard master for configuration management and load balancing, atomic two-phase shard handoff during reconfiguration, and duplicate request detection with bounded memory. Ensured linearizablity across configuration changes using coordinated log entries.",
                tags: ["Go", "Sharding", "Paxos"],
                highlights: ["Fault-Tolerance", "Distributed Systems", "Concurrency"]
            },
            {
                title: "Key/Value Service with Primary-Backup Replication",
                date: "March 2025",
                description: "Implemented a fault-tolerant key/value store in Go using a primary-backup replication scheme. Designed mechanisms for leader failover, state synchronization, and duplicate request suppression to maintain consistency and availability under failures.",
                tags: ["Go", "Primary-Backup"],
                highlights: ["Fault-Tolerance", "Distributed Systems", "Concurrency"]
            }
        ]
    },
    {
        id: 8,
        code: "EECS 445",
        name: "Machine Learning",
        semester: "Winter 2025",
        description: "Theory and implementation of state-of-the-art machine learning algorithms for large-scale real-world applications. Topics such as classification, neural networks, clustering, transformers, and auto-encoders",
        projects: [
            {
                title: "Dog Breed Image Classifier",
                date: "March 2025",
                description: "Developed an image classification system to identify dog breeds using both convolutional neural networks and vision transformers. Implemented image encoding pipelines to represent images as vectorized inputs, enabling comparison between CNN-based feature extraction and transformer-based attention models. Trained and evaluated models in PyTorch using transfer learning and standardized preprocessing techniques.",
                tags: ["Convolutional Neural Networks", "Vision Tranformers", "Image Encoding", "PyTorch"],
                highlights: ["Transfer learning", "Data encoding", "Fine-tuning"]
            },
            {
                title: "Medical Diagnosis ML",
                date: "February 2025",
                description: "Developed a machine learning model to assist with medical diagnosis using structured clinical data. Implemented and evaluated classification models in Python with scikit-learn, focusing on feature preprocessing, model selection, and performance analysis.",
                tags: ["SciKit Learn", "Python", "Multi-Layer Perceptron"],
                highlights: ["Data processing", "RBF Kernel", "Supervised learning"]
            }
        ]
    },
    {
        id: 9,
        code: "EECS 370",
        name: "Computer Organization",
        semester: "Winter 2025",
        description: "A study of computer organization and hardware: Assembly langauge programs, pipelining, caches, virtual memory, and I/O",
        projects: [
            {
                title: "Cache Simulator",
                date: "March 2025",
                description: "Implemented a configurable cache simulator to model set-associative caches with different block sizes, associativity levels, and replacement policies. Analyzed cache hit/miss behavior across memory access traces to evaluate performance tradeoffs in modern memory hierarchies.",
                tags: ["C"],
                highlights: ["Cache organization and policies", "Performance evaluation"]
            },
            {
                title: "5 State Pipeline Simulator",
                date: "March 2025",
                description: "Built a simulator for a 5-stage pipelined processor, modeling instruction fetch, decode, execute, memory, and write-back stages. Implemented hazard detection and pipeline stalling to ensure correct instruction execution.",
                tags: ["C", "Computer Architecture", "Assembly Language"],
                highlights: ["Instruction Pipelining", "Data and control hazards", "CPU performance modeling"]
            },
            {
                title: "Linker",
                date: "February 2025",
                description: "Implemented a static linker that combines multiple object files into a single executable. Resolved symbols, handled relocation, and constructed a final memory layout for executable code and data.",
                tags: ["C", "Libraries", "Assembly Language"],
                highlights: ["Relocation handling", "Symbol resolution"]
            }
        ]
    },
    {
        id: 10,
        code: "EECS 281",
        name: "Data Structures & Algorithms",
        semester: "Fall 2024",
        description: "Introduction to algorithm analysis and O-notation, fundamental data structures, search and sorting algorithms, as well as greedy algorithms.",
        projects: [
            {
                title: "Traveling Salesman Program",
                date: "November 2024",
                description: "Implemented multiple algorithms to approximate and solve the Traveling Salesman Problem, including brute-force and heuristic based approaches. Compared solution quality and runtime performance across different input sizes.",
                tags: ["Algorithms", "C++"],
                highlights: ["Graph algorithms", "Heuristic design"]
            },
            {
                title: "Pairing Priority Queue Implementation",
                date: "October 2024",
                description: "Designed and implemented a pairing heap priority queue supporting efficient insertion, deletion, and key updates. Analyzed performance relative to other priority queue implementations.",
                tags: ["C++", "Data Structures"],
                highlights: ["Pointer-Based structures", "Amortized analysis"]
            },
            {
                title: "BFS & DFS Traversal Algorithm",
                date: "September 2024",
                description: "Implemented breadth-first search and depth-first search traversals over graph data structures. Applied traversals to solve connectivity and pathfinding problems.",
                tags: ["C++", "Algorithms"],
                highlights: ["Queue and stack usage", "Graph representations", "Graph traversal algorithms"]
            }
        ]
    },
    {
        id: 11,
        code: "EECS 280",
        name: "Programming and Introduction to Data Structures",
        semester: "Winter 2024",
        description: "Algorithm development and effective program design. Study in object-oriented programming, pointers, recursion, and linked data structures.",
        projects: [
            {
                title: "Text editor",
                date: "March 2024",
                description: "Built a command-line text editor supporting cursor movement, insertion, deletion, and undo operations. Used iterators and linked data structures to efficiently manage editable text.",
                tags: ["C++", "Iterators"],
                highlights: ["Linked data structures", "State management"]
            },
            {
                title: "Euchre",
                date: "February 2024",
                description: "Implemented a complete simulation of the card game Euchre using object-oriented design principles. Modeled game rules, player behavior, and scoring logic.",
                tags: ["C++", "Object-Oriented Programming"],
                highlights: ["Class design", "Abstraction"]
            },
            {
                title: "Seam Carving Image Processor",
                date: "January 2024",
                description: "Implemented a seam carving algorithm to resize images by removing low-energy seams. Applied dynamic programming to preserve important image content during resizing.",
                tags: ["C++", "Image Processing"],
                highlights: ["Matrix-based computation", "Algorithmic optimization"]
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
