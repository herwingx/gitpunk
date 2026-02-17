import { TutorialStep, Language } from './types';

export const UI_TEXT: Record<Language, any> = {
    es: {
        title: "GitPunk",
        subtitle: "Protocolo de Inicio",
        roadmap: "Roadmap Activado",
        credits: "protocol_dev_by",
        repo: "Repo",
        star: "Star",
        phase: "FASE",
        node: "NODO",
        knowledgeBase: "Base de Conocimiento",
        activeInstruction: "Instrucción Activa",
        objective: "Objetivo de la Fase",
        prev: "Anterior",
        next: "Siguiente Nodo",
        completedTitle: "Sincronización Completa",
        completedDesc: "Has completado el ciclo. Tu código ahora vive seguro en la nube de GitHub. ¡Has dominado el flujo básico de Git!",
        commandBreakdown: "Desglose del Comando",
        matrixTitle: "MATRIZ DE PROTOCOLOS",
        openMatrix: "Abrir Matriz",
        terminal: {
            headerIntro: "SYSTEM_LOG",
            headerShell: "git-punk-shell",
            openWin: "Abrir PowerShell",
            openUnix: "Abrir Terminal",
            copy: "Copiar",
            copied: "Copiado",
            readOnly: "SOLO LECTURA",
            mobileWin: 'Usa "PowerShell" en Windows',
            mobileUnix: 'Usa "Terminal" en Mac/Linux',
        },
        chat: {
            placeholder: "Escribe tu duda...",
            placeholderOverload: "Esperando enfriamiento...",
            linkStable: "ENLACE ESTABLE",
            linkUnstable: "ENLACEINESTABLE",
            linkBusy: "OCUPADO",
            welcome: "Hola. Soy tu Asistente de Git. Pregúntame si no entiendes algo.",
            status: {
                online: "ONLINE",
                processing: "COMPUTING...",
                overload: "COOLING DOWN",
                offline: "OFFLINE"
            }
        }
    },
    en: {
        title: "GitPunk",
        subtitle: "Init Protocol",
        roadmap: "Roadmap Active",
        credits: "protocol_dev_by",
        repo: "Repo",
        star: "Star",
        phase: "PHASE",
        node: "NODE",
        knowledgeBase: "Knowledge Base",
        activeInstruction: "Active Instruction",
        objective: "Phase Objective",
        prev: "Previous",
        next: "Next Node",
        completedTitle: "Sync Complete",
        completedDesc: "Cycle complete. Your code now lives safely in the GitHub cloud. You have mastered the basic Git flow!",
        commandBreakdown: "Command Breakdown",
        matrixTitle: "PROTOCOL MATRIX",
        openMatrix: "Open Matrix",
        terminal: {
            headerIntro: "SYSTEM_LOG",
            headerShell: "git-punk-shell",
            openWin: "Open PowerShell",
            openUnix: "Open Terminal",
            copy: "Copy",
            copied: "Copied",
            readOnly: "READ ONLY",
            mobileWin: 'Use "PowerShell" on Windows',
            mobileUnix: 'Use "Terminal" on Mac/Linux',
        },
        chat: {
            placeholder: "Type your query...",
            placeholderOverload: "Awaiting cool-down...",
            linkStable: "LINK STABLE",
            linkUnstable: "LINK UNSTABLE",
            linkBusy: "BUSY",
            welcome: "Hello. I am your Git Assistant. Ask me if you don't understand something.",
            status: {
                online: "ONLINE",
                processing: "COMPUTING...",
                overload: "COOLING DOWN",
                offline: "OFFLINE"
            }
        }
    }
};

const STEPS_ES: TutorialStep[] = [
    // --- FASE 0: INTRODUCCIÓN ---
    {
        id: 1,
        title: "¿Qué es Git y GitHub?",
        command: "LOADING CONCEPT: GIT_VS_GITHUB...",
        description: "Antes de escribir código, entiende la diferencia. Son dos cosas distintas.",
        explanation: "Imagina un videojuego: GIT es el sistema de 'Guardar Partida' en tu consola (Local). GITHUB es el servidor online donde subes tus partidas para que otros las vean (Nube).",
        practicalTask: "Lee esto atentamente: Git vive en tu PC. GitHub vive en Internet. No necesitas escribir nada aún, solo asimila el concepto.",
        category: "CONCEPTOS CLAVE",
        icon: 'BrainCircuit'
    },
    {
        id: 2,
        title: "El Flujo de Trabajo",
        command: "LOADING WORKFLOW: EDIT -> ADD -> COMMIT...",
        description: "El ciclo de vida de tu código tiene 3 estados.",
        explanation: "1. Working Directory: Tu mesa de trabajo (donde editas). 2. Staging Area: El carrito de compras (donde eliges qué guardar). 3. Repository: La caja fuerte (donde se guarda la historia).",
        practicalTask: "Entiende esto: No se guarda automáticamente. Tú decides cuándo sacar la 'foto' (commit) de tu trabajo. Ahora, prepárate para instalar.",
        category: "CONCEPTOS CLAVE",
        icon: 'RefreshCw'
    },

    // --- FASE 1: PREPARACIÓN ---
    {
        id: 3,
        title: "Instalar el Núcleo (Git)",
        command: {
            windows: 'winget install --id Git.Git -e --source winget',
            linux: 'sudo apt install git-all'
        },
        description: "Instala el software necesario en tu sistema.",
        explanation: "Git es el motor que rastrea los cambios. Sin él, no hay viaje en el tiempo para tu código.",
        practicalTask: "IMPORTANTE: Si usas Windows, busca 'PowerShell' en el menú inicio y ábrelo. Si usas Mac/Linux, abre la app 'Terminal'. Luego copia y pega el comando correspondiente.",
        category: "INSTALACIÓN",
        icon: 'Download'
    },
    {
        id: 4,
        title: "Configurar Identidad",
        command: 'git config --global user.name "TuNombre"',
        description: "Firma digital para tus trabajos.",
        explanation: "Git necesita saber quién eres para atribuirte el mérito de tus cambios en el historial.",
        practicalTask: "En tu terminal (PowerShell o Bash), reemplaza 'TuNombre' con tu nombre real o nick y presiona Enter.",
        category: "CONFIGURACIÓN",
        icon: 'User',
        flagDetails: [
            { flag: "--global", description: "Aplica la configuración a nivel de usuario (para todos tus proyectos), no solo en esta carpeta." }
        ]
    },

    // --- FASE 2: INICIO DEL PROYECTO ---
    {
        id: 5,
        title: "Crear Base de Operaciones",
        command: {
            windows: 'mkdir CyberProfile; cd CyberProfile',
            linux: 'mkdir CyberProfile && cd CyberProfile'
        },
        description: "Crea una carpeta para el proyecto.",
        explanation: "Vamos a crear un sitio web personal. Primero necesitamos una carpeta vacía donde vivirá todo.",
        practicalTask: "Asegúrate de estar en tu PowerShell (Win) o Terminal (Mac/Linux). Ejecuta el comando para crear la carpeta y entrar en ella.",
        category: "CICLO BÁSICO",
        icon: 'FolderPlus'
    },
    {
        id: 6,
        title: "Inicializar Git",
        command: 'git init',
        description: "Activa el rastreo de Git en esta carpeta.",
        explanation: "Este comando crea una subcarpeta oculta (.git). Ahora Git está observando todo lo que pasa aquí dentro.",
        practicalTask: "Ejecuta 'git init'. Verás un mensaje que dice 'Initialized empty Git repository'.",
        category: "CICLO BÁSICO",
        icon: 'Zap'
    },

    // --- FASE 3: CREACIÓN Y GUARDADO ---
    {
        id: 7,
        title: "Crear Archivo Fuente",
        command: {
            windows: 'echo "<h1>Hola Mundo Cyberpunk</h1>" > index.html',
            linux: 'echo "<h1>Hola Mundo Cyberpunk</h1>" > index.html'
        },
        description: "Crea tu primer archivo HTML.",
        explanation: "Estamos creando un archivo real. En un proyecto real usarías un editor de código (VS Code), pero aquí lo haremos por terminal.",
        practicalTask: "Copia el comando. Esto creará un archivo llamado 'index.html' con un título dentro.",
        category: "CICLO BÁSICO",
        icon: 'FileCode'
    },
    {
        id: 8,
        title: "Verificar Radar (Status)",
        command: 'git status',
        description: "Consulta qué archivos son nuevos o han cambiado.",
        explanation: "El comando más importante. Te dirá que 'index.html' está en rojo (Untracked). Git lo ve, pero no lo está guardando aún.",
        practicalTask: "Ejecuta el comando y observa las letras rojas.",
        category: "CICLO BÁSICO",
        icon: 'Radar'
    },
    {
        id: 9,
        title: "Preparar (Stage)",
        command: 'git add index.html',
        description: "Mueve el archivo al área de preparación.",
        explanation: "Le dices a Git: 'Quiero que incluyas este archivo en la próxima foto que tomemos'.",
        practicalTask: "Ejecuta el comando. Si haces 'git status' de nuevo, verás que ahora está verde.",
        category: "CICLO BÁSICO",
        icon: 'PackagePlus'
    },
    {
        id: 10,
        title: "Guardar Versión (Commit)",
        command: 'git commit -m "Crear home page"',
        description: "Guarda los cambios permanentemente.",
        explanation: "¡Clic! 📸 Has creado la versión 1.0 de tu historia. El mensaje entre comillas explica qué hiciste.",
        practicalTask: "Ejecuta el comando para consolidar tu creación.",
        category: "CICLO BÁSICO",
        icon: 'Save',
        flagDetails: [
            { flag: "-m", description: "Message (Mensaje). Permite escribir la descripción del cambio directamente en el comando." }
        ]
    },

    // --- FASE 4: MODIFICACIÓN ---
    {
        id: 11,
        title: "Analizar Diferencias (Diff)",
        command: 'git diff',
        description: "Muestra qué cambió exactamente dentro de los archivos.",
        explanation: "Antes de guardar cambios nuevos, es vital revisar qué líneas de código modificaste para no romper nada.",
        practicalTask: "Primero modifica el archivo (ej: echo '<h2>Status: Online</h2>' >> index.html) y luego ejecuta 'git diff'.",
        category: "CICLO BÁSICO",
        icon: 'ScanEye'
    },
    {
        id: 12,
        title: "Guardar Cambios V2",
        command: 'git add . && git commit -m "Añadir subtitulo"',
        description: "Un combo: Preparar todo y guardar.",
        explanation: "Aquí usamos un truco ninja: 'git add .' agrega TODO lo que cambiaste, y luego hacemos el commit inmediatamente.",
        practicalTask: "Ejecuta este combo para guardar la versión 2.0 de tu web.",
        category: "CICLO BÁSICO",
        icon: 'Layers',
        flagDetails: [
            { flag: ".", description: "Selector comodín. Indica 'todo el directorio actual'. Agrega todos los archivos modificados o nuevos." },
            { flag: "-m", description: "Message. Especifica el mensaje del commit." }
        ]
    },

    // --- FASE: UNIVERSOS PARALELOS (NUEVO) ---
    {
        id: 13,
        title: "Crear Rama (Branch)",
        command: 'git branch feature-login',
        description: "Crea una línea temporal alternativa.",
        explanation: "Las ramas te permiten experimentar sin romper el código principal. Es como crear un 'Mundo Alternativo' donde puedes hacer locuras.",
        practicalTask: "Ejecuta el comando para crear una rama llamada 'feature-login'. Tu código principal (main) seguirá intacto.",
        category: "UNIVERSOS PARALELOS",
        icon: 'GitBranch'
    },
    {
        id: 14,
        title: "Cambiar de Universo",
        command: 'git checkout feature-login',
        description: "Te teletransporta a la nueva rama.",
        explanation: "Solo crear la rama no basta, tienes que 'entrar' en ella. Ahora cualquier cambio que hagas solo existirá en 'feature-login'.",
        practicalTask: "Ejecuta el comando. Verás 'Switched to branch feature-login'. Nota: En versiones nuevas también se usa 'git switch'.",
        category: "UNIVERSOS PARALELOS",
        icon: 'ArrowRightLeft',
        flagDetails: [
            { flag: "checkout", description: "Comando para cambiar de rama o restaurar archivos." }
        ]
    },
    {
        id: 15,
        title: "Fusión de Realidades",
        command: 'git checkout main && git merge feature-login',
        description: "Une los cambios de la rama experimental a la principal.",
        explanation: "Una vez que tu experimento funciona, vuelves a la realidad original (main) y absorbes los cambios.",
        practicalTask: "Regresa a main y fusiona tu trabajo. Ahora tu experimento es oficial.",
        category: "UNIVERSOS PARALELOS",
        icon: 'GitMerge'
    },

    // --- FASE 5: CONEXIÓN A GITHUB ---
    {
        id: 16,
        title: "Renombrar Rama Principal",
        command: 'git branch -M main',
        description: "Estandariza el nombre de tu línea temporal.",
        explanation: "Antiguamente se llamaba 'master', ahora el estándar de la industria es 'main'.",
        practicalTask: "Ejecuta el comando para modernizar tu repositorio.",
        category: "NUBE & COLABORACIÓN",
        icon: 'GitBranch',
        flagDetails: [
            { flag: "-M", description: "Move/Force. Renombra la rama actual forzando el cambio, incluso si el nombre ya existe." }
        ]
    },
    {
        id: 17,
        title: "Crear Repositorio en GitHub",
        command: 'echo "Ir a GitHub.com -> New Repository"',
        description: "Acción manual en el navegador.",
        explanation: "Git es local (en tu PC). GitHub es la nube. Necesitas crear el espacio en la nube para subir tu código.",
        practicalTask: "Go to GitHub.com, login, create a new repo named 'CyberProfile'. DO NOT initialize with README. Copy the HTTPS URL.",
        category: "NUBE & COLABORACIÓN",
        icon: 'Globe'
    },
    {
        id: 18,
        title: "Conectar Cables (Remote)",
        command: 'git remote add origin https://github.com/YOUR_USER/CyberProfile.git',
        description: "Link local folder with GitHub.",
        explanation: "You are saving the GitHub address with the nickname 'origin'. So you don't have to type the URL every time.",
        practicalTask: "Paste the command BUT replace the URL with the one you copied from your real GitHub.",
        category: "CLOUD & COLLAB",
        icon: 'Link',
        flagDetails: [
            { flag: "add", description: "Subcommand to register a new remote." },
            { flag: "origin", description: "Standard alias/name for your primary remote repository." }
        ]
    },
    {
        id: 19,
        title: "Subir a la Nube (Push)",
        command: 'git push -u origin main',
        description: "Envía tus commits locales a GitHub.",
        explanation: "Truth moment! Files travel from PC to server. The '-u' connects your local branch with the cloud one forever.",
        practicalTask: "Run the command. If it's your first time, it will ask to login in browser.",
        category: "CLOUD & COLLAB",
        icon: 'UploadCloud',
        flagDetails: [
            { flag: "-u", description: "Upstream. Sets a permanent link between your local branch and the cloud one for future pushes." }
        ]
    }
];

const STEPS_EN: TutorialStep[] = [
    // --- PHASE 0: INTRO ---
    {
        id: 1,
        title: "What is Git vs GitHub?",
        command: "LOADING CONCEPT: GIT_VS_GITHUB...",
        description: "Before writing code, understand the difference. They are two distinct entities.",
        explanation: "Imagine a video game: GIT is the 'Save Game' system on your console (Local). GITHUB is the online server where you upload saves for others to see (Cloud).",
        practicalTask: "Read carefully: Git lives on your PC. GitHub lives on the Internet. No need to write code yet, just assimilate the concept.",
        category: "KEY CONCEPTS",
        icon: 'BrainCircuit'
    },
    {
        id: 2,
        title: "The Workflow",
        command: "LOADING WORKFLOW: EDIT -> ADD -> COMMIT...",
        description: "Your code's lifecycle has 3 states.",
        explanation: "1. Working Directory: Your workbench (where you edit). 2. Staging Area: The shopping cart (where you choose what to save). 3. Repository: The vault (where history is kept).",
        practicalTask: "Understand this: Autosave doesn't exist here. You decide when to take the 'snapshot' (commit) of your work. Now, prepare to install.",
        category: "KEY CONCEPTS",
        icon: 'RefreshCw'
    },

    // --- PHASE 1: PREP ---
    {
        id: 3,
        title: "Install the Core (Git)",
        command: {
            windows: 'winget install --id Git.Git -e --source winget',
            linux: 'sudo apt install git-all'
        },
        description: "Install necessary software on your system.",
        explanation: "Git is the engine that tracks changes. Without it, there is no time travel for your code.",
        practicalTask: "IMPORTANT: If using Windows, open 'PowerShell'. If Mac/Linux, open 'Terminal'. Then copy and paste the command.",
        category: "INSTALLATION",
        icon: 'Download'
    },
    {
        id: 4,
        title: "Configure Identity",
        command: 'git config --global user.name "YourName"',
        description: "Digital signature for your work.",
        explanation: "Git needs to know who you are to credit you for changes in the history log.",
        practicalTask: "In your terminal, replace 'YourName' with your real name or handle and press Enter.",
        category: "CONFIGURATION",
        icon: 'User',
        flagDetails: [
            { flag: "--global", description: "Applies the setting to the current user (all projects), not just this folder." }
        ]
    },

    // --- PHASE 2: PROJECT INIT ---
    {
        id: 5,
        title: "Create Base of Operations",
        command: {
            windows: 'mkdir CyberProfile; cd CyberProfile',
            linux: 'mkdir CyberProfile && cd CyberProfile'
        },
        description: "Create a folder for the project.",
        explanation: "We are creating a personal website. First, we need an empty folder where everything will live.",
        practicalTask: "Ensure you are in PowerShell (Win) or Terminal (Mac/Linux). Run the command to create the folder and enter it.",
        category: "BASIC CYCLE",
        icon: 'FolderPlus'
    },
    {
        id: 6,
        title: "Initialize Git",
        command: 'git init',
        description: "Activate Git tracking in this folder.",
        explanation: "This command creates a hidden subfolder (.git). Now Git is watching everything that happens inside here.",
        practicalTask: "Run 'git init'. You will see a message saying 'Initialized empty Git repository'.",
        category: "BASIC CYCLE",
        icon: 'Zap'
    },

    // --- PHASE 3: CREATE & SAVE ---
    {
        id: 7,
        title: "Create Source File",
        command: {
            windows: 'echo "<h1>Hello Cyberpunk World</h1>" > index.html',
            linux: 'echo "<h1>Hello Cyberpunk World</h1>" > index.html'
        },
        description: "Create your first HTML file.",
        explanation: "We are creating a real file. In a real project you'd use a code editor (VS Code), but here we do it via terminal.",
        practicalTask: "Copy the command. This will create a file named 'index.html' with a title inside.",
        category: "BASIC CYCLE",
        icon: 'FileCode'
    },
    {
        id: 8,
        title: "Check Radar (Status)",
        command: 'git status',
        description: "Check which files are new or changed.",
        explanation: "The most important command. It tells you 'index.html' is red (Untracked). Git sees it, but isn't saving it yet.",
        practicalTask: "Run the command and observe the red text.",
        category: "BASIC CYCLE",
        icon: 'Radar'
    },
    {
        id: 9,
        title: "Stage Files",
        command: 'git add index.html',
        description: "Move file to the staging area.",
        explanation: "You tell Git: 'I want to include this file in the next photo we take'.",
        practicalTask: "Run the command. If you do 'git status' again, you'll see it is now green.",
        category: "BASIC CYCLE",
        icon: 'PackagePlus'
    },
    {
        id: 10,
        title: "Save Version (Commit)",
        command: 'git commit -m "Create home page"',
        description: "Permanently save changes.",
        explanation: "Click! 📸 You've created version 1.0 of your history. The message in quotes explains what you did.",
        practicalTask: "Run the command to consolidate your creation.",
        category: "BASIC CYCLE",
        icon: 'Save',
        flagDetails: [
            { flag: "-m", description: "Message. Allows you to provide the commit description inline." }
        ]
    },

    // --- PHASE 4: MODIFY ---
    {
        id: 11,
        title: "Analyze Diff",
        command: 'git diff',
        description: "Show exactly what changed inside files.",
        explanation: "Before saving new changes, it is vital to review what lines of code you modified to avoid breaking things.",
        practicalTask: "First modify the file (e.g., echo '<h2>Status: Online</h2>' >> index.html) then run 'git diff'.",
        category: "BASIC CYCLE",
        icon: 'ScanEye'
    },
    {
        id: 12,
        title: "Save Changes V2",
        command: 'git add . && git commit -m "Add subtitle"',
        description: "Combo: Stage everything and save.",
        explanation: "Ninja trick: 'git add .' adds EVERYTHING you changed, then we commit immediately.",
        practicalTask: "Run this combo to save version 2.0 of your web.",
        category: "BASIC CYCLE",
        icon: 'Layers',
        flagDetails: [
            { flag: ".", description: "Wildcard selector. Represents 'current directory', adding all modified files." },
            { flag: "-m", description: "Message. Sets the commit message." }
        ]
    },

    // --- PHASE: PARALLEL UNIVERSES (NEW) ---
    {
        id: 13,
        title: "Create Branch",
        command: 'git branch feature-login',
        description: "Create an alternative timeline.",
        explanation: "Branches allow you to experiment without breaking the main code. It's like creating an 'Alternate World'.",
        practicalTask: "Run the command to create a branch named 'feature-login'. Your main code stays intact.",
        category: "PARALLEL UNIVERSES",
        icon: 'GitBranch'
    },
    {
        id: 14,
        title: "Switch Universe",
        command: 'git checkout feature-login',
        description: "Teleport to the new branch.",
        explanation: "Creating isn't enough, you must 'enter' it. Now any change exists only in 'feature-login'.",
        practicalTask: "Run command. You'll see 'Switched to branch feature-login'. Note: Newer versions use 'git switch'.",
        category: "PARALLEL UNIVERSES",
        icon: 'ArrowRightLeft',
        flagDetails: [
            { flag: "checkout", description: "Command to switch branches or restore files." }
        ]
    },
    {
        id: 15,
        title: "Merge Realities",
        command: 'git checkout main && git merge feature-login',
        description: "Join changes from experiment to main.",
        explanation: "Once your experiment works, you return to original reality (main) and absorb the changes.",
        practicalTask: "Return to main and merge your work. Your experiment is now official.",
        category: "PARALLEL UNIVERSES",
        icon: 'GitMerge'
    },

    // --- PHASE 5: GITHUB CONNECT ---
    {
        id: 16,
        title: "Rename Main Branch",
        command: 'git branch -M main',
        description: "Standardize your timeline name.",
        explanation: "Formerly called 'master', the industry standard is now 'main'.",
        practicalTask: "Run the command to modernize your repository.",
        category: "CLOUD & COLLAB",
        icon: 'GitBranch',
        flagDetails: [
            { flag: "-M", description: "Move/Force. Renames the current branch forcefully, even if the name exists." }
        ]
    },
    {
        id: 17,
        title: "Create GitHub Repo",
        command: 'echo "Go to GitHub.com -> New Repository"',
        description: "Manual action in browser.",
        explanation: "Git is local (PC). GitHub is cloud. You need to create space in the cloud to upload your code.",
        practicalTask: "Go to GitHub.com, login, create a new repo named 'CyberProfile'. DO NOT initialize with README. Copy the HTTPS URL.",
        category: "CLOUD & COLLAB",
        icon: 'Globe'
    },
    {
        id: 18,
        title: "Connect Cables (Remote)",
        command: 'git remote add origin https://github.com/YOUR_USER/CyberProfile.git',
        description: "Link local folder with GitHub.",
        explanation: "You are saving the GitHub address with the nickname 'origin'. So you don't have to type the URL every time.",
        practicalTask: "Paste the command BUT replace the URL with the one you copied from your real GitHub.",
        category: "CLOUD & COLLAB",
        icon: 'Link',
        flagDetails: [
            { flag: "add", description: "Subcommand to register a new remote." },
            { flag: "origin", description: "Standard alias/name for your primary remote repository." }
        ]
    },
    {
        id: 19,
        title: "Upload to Cloud (Push)",
        command: 'git push -u origin main',
        description: "Send local commits to GitHub.",
        explanation: "Truth moment! Files travel from PC to server. The '-u' connects your local branch with the cloud one forever.",
        practicalTask: "Run the command. If it's your first time, it will ask to login in browser.",
        category: "CLOUD & COLLAB",
        icon: 'UploadCloud',
        flagDetails: [
            { flag: "-u", description: "Upstream. Sets a permanent link between your local branch and the cloud one for future pushes." }
        ]
    }
];

export const TUTORIAL_CONTENT: Record<Language, TutorialStep[]> = {
    es: STEPS_ES,
    en: STEPS_EN
};

export const CHEAT_SHEET_DATA: Record<Language, { category: string, commands: { cmd: string, desc: string }[] }[]> = {
    es: [
        {
            category: "Configuración",
            commands: [
                { cmd: 'git config --global user.name "Nombre"', desc: 'Define tu nombre de usuario.' },
                { cmd: 'git config --global user.email "mail"', desc: 'Define tu correo.' }
            ]
        },
        {
            category: "Inicio",
            commands: [
                { cmd: 'git init', desc: 'Inicia un repositorio nuevo.' },
                { cmd: 'git clone <url>', desc: 'Descarga un repo existente.' }
            ]
        },
        {
            category: "Cambios",
            commands: [
                { cmd: 'git status', desc: 'Ver estado de archivos.' },
                { cmd: 'git add .', desc: 'Prepara todo para guardar.' },
                { cmd: 'git commit -m "msg"', desc: 'Guarda los cambios.' }
            ]
        },
        {
            category: "Ramas",
            commands: [
                { cmd: 'git branch <nombre>', desc: 'Crea una nueva rama.' },
                { cmd: 'git checkout <nombre>', desc: 'Cambia a otra rama.' },
                { cmd: 'git merge <nombre>', desc: 'Fusiona rama con actual.' }
            ]
        },
        {
            category: "Remoto",
            commands: [
                { cmd: 'git push', desc: 'Sube cambios a la nube.' },
                { cmd: 'git pull', desc: 'Baja cambios de la nube.' },
                { cmd: 'git remote -v', desc: 'Ver urls remotas.' }
            ]
        }
    ],
    en: [
        {
            category: "Setup",
            commands: [
                { cmd: 'git config --global user.name "Name"', desc: 'Sets your username.' },
                { cmd: 'git config --global user.email "mail"', desc: 'Sets your email.' }
            ]
        },
        {
            category: "Start",
            commands: [
                { cmd: 'git init', desc: 'Initialize new repo.' },
                { cmd: 'git clone <url>', desc: 'Download existing repo.' }
            ]
        },
        {
            category: "Changes",
            commands: [
                { cmd: 'git status', desc: 'Check file status.' },
                { cmd: 'git add .', desc: 'Stage all files.' },
                { cmd: 'git commit -m "msg"', desc: 'Save changes.' }
            ]
        },
        {
            category: "Branches",
            commands: [
                { cmd: 'git branch <name>', desc: 'Create new branch.' },
                { cmd: 'git checkout <name>', desc: 'Switch branch.' },
                { cmd: 'git merge <name>', desc: 'Merge branch into current.' }
            ]
        },
        {
            category: "Remote",
            commands: [
                { cmd: 'git push', desc: 'Upload changes.' },
                { cmd: 'git pull', desc: 'Download changes.' },
                { cmd: 'git remote -v', desc: 'View remote urls.' }
            ]
        }
    ]
}

export const GET_AI_INSTRUCTION = (lang: Language) => `
${lang === 'es' ? 'Eres GitPunk AI, asistente en español.' : 'You are GitPunk AI, an assistant in English.'}
OBJECTIVE: Guide the user in learning Git, GitHub, and Terminal commands related to version control.
STRICT PROTOCOL:
1. SCOPE: ONLY answer questions about Git, GitHub, and Terminal.
2. ACCESS DENIED: If topic is unrelated (cooking, politics, css, react, vercel), REFUSE with: "⚠️ ACCESS DENIED: ${lang === 'es' ? 'Tema fuera de alcance. Solo Git/GitHub.' : 'Topic out of scope. Only Git/GitHub.'}"
3. STYLE: Cyberpunk, futuristic, concise.
4. LANGUAGE: RESPOND ONLY IN ${lang === 'es' ? 'SPANISH' : 'ENGLISH'}.
`;