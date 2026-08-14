window.CHAPTERS = [
{
 id:1,
 title:"The Factory Foreman — What is Jenkins?",
 analogy:"Jenkins is the foreman who never sleeps, watching the conveyor belt",
 emoji:"🏭",
 desc:"Why Jenkins still runs 60% of CI/CD, architecture controller+agents",
 content:`
  <span class="badge">🔰 Foundation • Factory Overview</span>
  <h1>The Factory Foreman — What is Jenkins?</h1>
  <p class="muted">Imagine a car factory. Orders come in (git push). The foreman (Jenkins) yells, gets a worker to fetch parts, assemble, paint, test drive, and ship. Jenkins does exactly that for code.</p>
  <div class="analogy-box"><div class="analogy-emoji">🏭</div><div class="analogy-text"><strong>Factory Analogy:</strong> Jenkins controller = foreman's office with clipboards. Pipeline = conveyor belt route. Agent = worker + bench. Executor = worker's hands (can do 2 jobs if 2 executors). Jenkinsfile = laminated instruction manual attached to each car chassis.</div></div>
  <h2>Core Concepts Map</h2>
  <table><tr><th>Factory</th><th>Jenkins Term</th><th>What it does</th></tr>
  <tr><td>Foreman office</td><td>Controller (master)</td><td>Schedules jobs, UI, holds configs</td></tr>
  <tr><td>Conveyor belt path</td><td>Pipeline</td><td>Sequence: Build → Test → Deploy</td></tr>
  <tr><td>Worker + bench</td><td>Agent / Node</td><td>Machine that actually builds</td></tr>
  <tr><td>Instruction manual</td><td>Jenkinsfile</td><td>Groovy DSL checked into Git</td></tr>
  <tr><td>Station</td><td>Stage</td><td>Logical grouping, shows in Blue Ocean</td></tr>
  <tr><td>Tool action</td><td>Step</td><td>sh, git, docker.build etc.</td></tr>
  </table>
  <h2>Why Jenkins in 2026?</h2>
  <ul><li>Self-hosted, plugin-rich (1900+ plugins) – you own the factory building.</li><li>Works with any language, any cloud — bring your own workers.</li><li>Declarative syntax = readable, Blue Ocean = visual like factory CCTV.</li><li>Proven for 15+ years, integrates with GitHub, Docker, K8s.</li></ul>
  <div class="callout"><strong>Key idea:</strong> Don't think "scripts" — think "assembly line that starts when an order (commit) arrives." Everything is an automated handoff.</div>
  <h2>Jenkins Architecture One-Pager</h2>
  <div class="code-block"><div class="code-head"><span>diagram (text)</span></div><pre><code>Git push → webhook → Controller (foreman)
                |
   schedules -> Agent 1 (linux worker) : checkout & build
                -> Agent 2 (docker)    : test
                -> Agent 3 (k8s)       : deploy
                |
   artifacts, logs back to controller → UI + Blue Ocean
</code></pre></div>
`
},
{
 id:2,
 title:"Setting Up the Factory — Install & Run Jenkins",
 analogy:"Pouring foundation, wiring electricity, opening factory gates",
 emoji:"🛠️",
 desc:"Docker, war, plugins, first admin, unlock",
 content:`
  <span class="badge">Lab 1 Inside • Setup</span>
  <h1>Setting Up the Factory</h1>
  <p class="muted">We won't build a factory on the street. Best practice: run Jenkins in Docker — isolated, easy to wipe and rebuild like a portable workshop container.</p>
  <div class="analogy-box"><div class="analogy-emoji">🏗️</div><div class="analogy-text"><strong>Analogy:</strong> Installing Jenkins = building foreman's office. Running it in Docker = putting office inside a shipping container you can move anywhere. JENKINS_HOME = filing cabinet that must persist even if you replace the container.</div></div>
  <h2>Option A: Docker (Recommended)</h2>
  <div class="code-block"><div class="code-head"><span>bash</span><button class="copy-btn" onclick="copyCode(this)">Copy</button></div><pre><code>docker network create jenkins-net
docker volume create jenkins_home

docker run -d --name jenkins \
  --network jenkins-net \
  -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:lts-jdk17

docker logs jenkins -f
# copy initialAdminPassword from logs
# open http://localhost:8080 → Install suggested plugins
</code></pre></div>
  <h2>Option B: WAR File</h2>
  <div class="code-block"><div class="code-head"><span>bash</span><button class="copy-btn" onclick="copyCode(this)">Copy</button></div><pre><code>java -jar jenkins.war --httpPort=8080
# home at ~/.jenkins
</code></pre></div>
  <h2>Essential First Config</h2>
  <ul><li>Manage Jenkins → Plugins → Available: Blue Ocean, Pipeline: Stage View, Docker Pipeline, GitHub Branch Source</li><li>Manage → System → # executors on controller: set to 0 for security/scale (use agents)</li><li>Manage → Security → Enable CSRF</li></ul>
  <div class="lab"><div class="lab-head">🧪 Lab 1 — Spin up Jenkins Factory in 5 mins</div><div class="lab-body">
  <p><strong>Goal:</strong> Get Jenkins running, unlock, install Blue Ocean, create first admin.</p>
  <ol><li>Run docker commands above</li><li>Open localhost:8080, paste password from <code>docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword</code></li><li>Install suggested plugins + add Blue Ocean</li><li>Create user: factory-admin / your password</li><li>Go to Dashboard → New Item → check Pipeline option exists</li></ol>
  <p>✅ Done when you see Pipeline and Multibranch options.</p>
  </div></div>
`
},
{
 id:3,
 title:"Freestyle vs Pipeline — Manual Bench vs Conveyor",
 analogy:"Freestyle = one craftsman building whole car alone. Pipeline = conveyor.",
 emoji:"🔀",
 desc:"Why freestyle dies, pipeline as code, durability",
 content:`
  <span class="badge">Chapter 3 • Paradigm Shift</span>
  <h1>Freestyle vs Pipeline</h1>
  <p class="muted">Old shops built a car on one bench. If worker called sick, nobody knows steps. Modern factory uses conveyor with manual taped at each station — that's Pipeline as Code.</p>
  <div class="analogy-box"><div class="analogy-emoji">🪑➡️🏭</div><div class="analogy-text"><strong>Analogy:</strong> Freestyle job = Post-it notes in UI, only in foreman's desk drawer. Pipeline = laminated Jenkinsfile inside Git — every chassis carries its own instructions, versioned.</div></div>
  <h2>Freestyle Limitations</h2>
  <ul><li>Click-config in UI, not versioned, no code review</li><li>Hard to replicate, no branches logic</li><li>Breaks when you have 10 microservices</li></ul>
  <h2>Pipeline Advantages</h2>
  <ul><li><strong>Code in repo:</strong> Jenkinsfile next to code</li><li><strong>Durable:</strong> Survives Jenkins restarts like belt pause/resume</li><li><strong>Visual stages:</strong> Blue Ocean shows where car got stuck (paint or test?)</li><li><strong>Two flavors:</strong> Declarative (structured, easier) vs Scripted (Groovy full power)</li></ul>
  <h2>Declarative Skeleton</h2>
  <div class="code-block"><div class="code-head"><span>Jenkinsfile • declarative</span><button class="copy-btn" onclick="copyCode(this)">Copy</button></div><pre><code>pipeline {
  agent any
  stages {
    stage('Build') { steps { echo 'Compiling...' } }
    stage('Test') { steps { echo 'Testing...' } }
    stage('Deploy') { steps { echo 'Shipping...' } }
  }
}
</code></pre></div>
  <div class="lab"><div class="lab-head">🧪 Lab 2 — Convert Freestyle to Pipeline</div><div class="lab-body">
  <ol><li>Create Freestyle: New Item → Freestyle → add shell step <code>echo hello freestyle</code> → Build</li>
  <li>Create Pipeline: New Item → Pipeline → Definition: Pipeline script → paste skeleton above → Build</li>
  <li>Compare logs: Pipeline shows stages in Stage View</li>
  <li>Now choose Pipeline script from SCM (later chapters) — understand why Jenkinsfile in Git wins.</li>
  </ol>
  </div></div>
`
},
{
 id:4,
 title:"Your First Conveyor — Jenkinsfile Anatomy",
 analogy:"Stations on belt: Build → Test → Pack → Ship",
 emoji:"📜",
 desc:"pipeline { agent stages steps post } deep dive",
 content:`
  <span class="badge">Lab 3 Inside • Core Skill</span>
  <h1>Your First Conveyor — Jenkinsfile Anatomy</h1>
  <div class="analogy-box"><div class="analogy-emoji">📜</div><div class="analogy-text"><strong>Manual analogy:</strong> Jenkinsfile is instruction sheet that travels with product. Top says which worker (agent), middle lists stations (stages), each station lists hand motions (steps), end says what to do if dropped (post).</div></div>
  <h2>Declarative Mandatory Sections</h2>
  <div class="code-block"><div class="code-head"><span>Jenkinsfile</span><button class="copy-btn" onclick="copyCode(this)">Copy</button></div><pre><code>pipeline {
  agent any // or none, label 'linux', docker { image 'node:20' }
  options {
    timeout(time: 30, unit: 'MINUTES')
    buildDiscarder(logRotator(numToKeepStr:'20'))
    timestamps()
  }
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Build') {
      steps { sh 'npm ci && npm run build' }
    }
    stage('Test') {
      steps { sh 'npm test' }
    }
  }
  post {
    always { echo 'Belt stopped, cleaning…' }
    success { echo 'Car shipped!' }
    failure { echo 'Stop line, inspect!' }
  }
}
</code></pre></div>
  <h2>agent types</h2>
  <table><tr><th>Syntax</th><th>Factory meaning</th></tr>
  <tr><td><code>agent any</code></td><td>Any free worker grabs it</td></tr>
  <tr><td><code>agent { label 'docker' }</code></td><td>Only worker with docker skill</td></tr>
  <tr><td><code>agent { docker { image 'maven:3' } }</code></td><td>Temp pop-up booth with that tool</td></tr>
  <tr><td><code>agent none</code> + per-stage agent</td><td>Different worker per station — welding vs painting</td></tr>
  </table>
  <div class="lab"><div class="lab-head">🧪 Lab 3 — Build-Test-Deploy Pipeline</div><div class="lab-body">
  <p>Create GitHub repo <code>demo-app</code> with simple Node or Python app + this Jenkinsfile:</p>
  <div class="code-block"><div class="code-head"><span>Jenkinsfile</span></div><pre><code>pipeline {
  agent any
  stages {
    stage('Build') { steps { sh 'echo building v${BUILD_NUMBER}' } }
    stage('Test') { steps { sh 'echo testing' } }
    stage('Package') { steps { archiveArtifacts artifacts: '**/dist/**', allowEmptyArchive:true } }
  }
}
</code></pre></div>
  <p>Push to GitHub, create Pipeline job pointing to SCM, run. Check Blue Ocean visualization.</p>
  </div></div>
`
},
{
 id:5,
 title:"The Instruction Language — Groovy DSL, Stages, Steps, Post",
 analogy:"Groovy is dialect foreman uses, stages are rooms, post is cleanup crew",
 emoji:"🧠",
 desc:"Declarative vs Scripted, when, environment, script block",
 content:`
  <span class="badge">Groovy Deep Dive</span>
  <h1>The Instruction Language</h1>
  <p class="muted">Jenkinsfile isn't just YAML. Underneath it's Groovy — JVM language like a flexible dialect that lets foreman write if/else, loops, try/catch in the manual when needed.</p>
  <h2>Declarative vs Scripted</h2>
  <table><tr><th>Feature</th><th>Declarative</th><th>Scripted</th></tr>
  <tr><td>Starts with</td><td><code>pipeline {</code></td><td><code>node {</code></td></tr>
  <tr><td>Learning curve</td><td>Low — structured</td><td>High — full Groovy</td></tr>
  <tr><td>Validation</td><td>Checks syntax early</td><td>Runs till fails</td></tr>
  <tr><td>Use</td><td>95% jobs</td><td>Complex dynamic logic</td></tr>
  </table>
  <h2>Power Features: when, environment, script</h2>
  <div class="code-block"><div class="code-head"><span>Jenkinsfile Advanced</span><button class="copy-btn" onclick="copyCode(this)">Copy</button></div><pre><code>pipeline {
  agent any
  environment {
    APP_NAME = 'shop'
    // credentials() helper coming in Ch 8
  }
  stages {
    stage('Build') {
      when { branch 'main' }
      steps { echo "Building \${APP_NAME}" }
    }
    stage('Deploy Staging') {
      when {
        allOf { branch 'main'; not { changeRequest() } }
      }
      steps { script {
          if (env.BUILD_NUMBER.toInteger() % 2 == 0) {
            echo "Even build, extra checks"
          }
        }
      }
    }
  }
  post {
    failure {
      emailext subject: "Build broke!", body: "Check \${BUILD_URL}", to: "team@example.com"
    }
  }
}
</code></pre></div>
  <h2>Common Steps cheat sheet</h2>
  <ul><li><code>sh 'make'</code> / <code>bat</code> on Windows, <code>echo</code>, <code>checkout scm</code>, <code>archiveArtifacts</code>, <code>junit</code>, <code>input</code> for manual approval</li><li>Tip: Use <code>http://jenkins/pipeline-syntax/</code> → Snippet Generator like Google Translate for Groovy.</li></ul>
`
},
{
 id:6,
 title:"Workers & Workbenches — Agents, Nodes, Executors",
 analogy:"Factory has welding benches, paint booths, inspection pits — label them",
 emoji:"👷",
 desc:"Permanent, Docker, Kubernetes, SSH agents, labels, executors tuning",
 content:`
  <span class="badge">Scaling Concept</span>
  <h1>Workers & Workbenches</h1>
  <div class="analogy-box"><div class="analogy-emoji">👷</div><div class="analogy-text"><strong>Analogy:</strong> One bench can't weld AND paint at same time without contamination. So you have labeled benches: 'weld', 'paint', 'test'. Executor = number of hands per bench (2 executors = 2 cars can be at that bench). Controller should have 0 executors in production — foreman doesn't weld.</div></div>
  <h2>Agent Types</h2>
  <table><tr><th>Type</th><th>When to use</th><th>Factory</th></tr>
  <tr><td>Permanent (SSH/JNLP)</td><td>Long-running Linux VM</td><td>Fixed bench</td></tr>
  <tr><td>Docker agent</td><td>Clean build each run</td><td>Disposable pop-up tent with tools</td></tr>
  <tr><td>Kubernetes</td><td>Auto-scale pods</td><td>Call temp workers from gig economy</td></tr>
  <tr><td>Cloud agents (EC2)</td><td>Burst</td><td>Rent extra workshop for rush order</td></tr>
  </table>
  <h2>Define Custom Label</h2>
  <div class="code-block"><div class="code-head"><span>Manage → Nodes</span></div><pre><code>Manage Jenkins → Nodes → New Node → Permanent Agent
Name: linux-builder
Labels: linux docker maven
Executors: 2
Remote root: /home/jenkins/agent
Launch: Launch agent via SSH, add host + creds
</code></pre></div>
  <h2>Use label in pipeline</h2>
  <div class="code-block"><div class="code-head"><span>Jenkinsfile</span><button class="copy-btn" onclick="copyCode(this)">Copy</button></div><pre><code>pipeline {
  agent { label 'docker' }
  stages {
    stage('Build on heavy machine') {
      agent { label 'linux && maven' }
      steps { sh 'mvn clean package' }
    }
  }
}
</code></pre></div>
`
},
{
 id:7,
 title:"Orders & Signals — Parameters, Triggers, Webhooks",
 analogy:"Customer order form and doorbell that starts the line",
 emoji:"🔔",
 desc:"Build parameters, cron, pollSCM, GitHub webhooks, input step",
 content:`
  <span class="badge">Lab 4 Inside • Interactivity</span>
  <h1>Orders & Signals</h1>
  <p class="muted">Factory doesn't start unless order form filled or bell rings. Jenkins same: Parameter = order form checkbox (deploy env?), Trigger = automatic bell (cron, webhook).</p>
  <div class="analogy-box"><div class="analogy-emoji">🔔</div><div class="analogy-text"><strong>Analogy:</strong> POLL SCM = worker goes to mailbox every 5min checking for new letter. Webhook = post office calls you instantly when letter arrives — faster, cheaper.</div></div>
  <h2>Parameters (Order Form)</h2>
  <div class="code-block"><div class="code-head"><span>Jenkinsfile</span><button class="copy-btn" onclick="copyCode(this)">Copy</button></div><pre><code>pipeline {
  agent any
  parameters {
    choice(name:'ENV', choices:['dev','staging','prod'], description:'Target')
    booleanParam(name:'RUN_TESTS', defaultValue:true, description:'Run unit tests?')
    string(name:'VERSION', defaultValue:'', description:'Tag to deploy')
  }
  stages {
    stage('Deploy') {
      steps { echo "Deploying \${params.VERSION} to \${params.ENV}" }
    }
  }
}
</code></pre></div>
  <h2>Triggers</h2>
  <div class="code-block"><div class="code-head"><span>Declarative triggers</span></div><pre><code>pipeline {
  agent any
  triggers {
    cron('H 2 * * *') // nightly 2am → night shift like factory cleaning crew
    // githubPush() when using GitHub plugin
  }
  stages { stage('Nightly') { steps { echo 'Running nightly' } } }
}
</code></pre></div>
  <h2>Human Approval Gate</h2>
  <div class="code-block"><div class="code-head"><span>input step</span></div><pre><code>stage('Approve Prod') {
  steps {
    input message:'Deploy to PROD?', ok:'Yes, ship it',
          submitter:'release-managers'
  }
}
</code></pre></div>
  <div class="lab"><div class="lab-head">🧪 Lab 4 — Parameterized Deploy with Approval</div><div class="lab-body">
  <ol><li>Add parameters choice ENV dev/staging/prod to Jenkinsfile</li><li>Add input stage before prod deploy</li><li>Run twice: once choose dev (no gate), once prod (gate appears). Use <code>BUILD_USER</code> env to audit who approved.</li></ol>
  </div></div>
`
},
{
 id:8,
 title:"Locked Cabinets — Env Vars, Credentials, Secrets",
 analogy:"Factory has locked tool cabinets, key cards, not Post-its with passwords",
 emoji:"🔐",
 desc:"Credentials plugin, binding, env vars, masking",
 content:`
  <span class="badge">Lab 5 Inside • Security 101</span>
  <h1>Locked Cabinets</h1>
  <div class="analogy-box"><div class="analogy-emoji">🔐</div><div class="analogy-text"><strong>Analogy:</strong> Leaving AWS key in Jenkinsfile = taping master key to factory entrance. Use locked cabinet (Credentials store) and give workers temporary badge (withCredentials) only during task, then badge expires.</div></div>
  <h2>Credential Types</h2>
  <table><tr><th>Type</th><th>Example</th></tr><tr><td>Secret text</td><td>API token, Slack webhook</td></tr><tr><td>Username/password</td><td>Docker Hub, Git</td></tr><tr><td>Secret file</td><td>Kubeconfig, .pem</td></tr><tr><td>SSH key</td><td>Deploy to server</td></tr></table>
  <h2>Store & Use</h2>
  <div class="code-block"><div class="code-head"><span>Manage Jenkins → Credentials</span></div><pre><code># Add via UI: Manage → Credentials → System → Global → Add
# Then use in pipeline:
</code></pre></div>
  <div class="code-block"><div class="code-head"><span>Jenkinsfile secure</span><button class="copy-btn" onclick="copyCode(this)">Copy</button></div><pre><code>pipeline {
  agent any
  environment {
    DOCKERHUB = credentials('dockerhub-creds') // creates DOCKERHUB_USR PWD
    SLACK_URL = credentials('slack-webhook')
  }
  stages {
    stage('Build & Push') {
      steps {
        withCredentials([string(credentialsId:'aws-key', variable:'AWS_KEY')]) {
          sh '''
            echo $DOCKERHUB_PSW | docker login -u $DOCKERHUB_USR --password-stdin
            docker build -t myapp:${BUILD_NUMBER} .
            # AWS_KEY masked in logs ****
            echo "Key length ${#AWS_KEY}"
          '''
        }
      }
    }
  }
}
</code></pre></div>
  <div class="callout">Jenkins automatically masks secrets in logs. Never <code>echo $SECRET</code> in plain — it still shows **** but avoid.</div>
  <div class="lab"><div class="lab-head">🧪 Lab 5 — Secure Secrets</div><div class="lab-body">
  <ol><li>Add credential ID <code>my-secret</code> as secret text in Jenkins</li><li>Use <code>withCredentials</code> to echo env in a stage, confirm log shows ****</li><li>Try without withCredentials (fails) — proves cabinet concept.</li></ol>
  </div></div>
`
},
{
 id:9,
 title:"Upgrades & Glass Walls — Plugins & Blue Ocean",
 analogy:"Plugins = snap-on factory tools, Blue Ocean = glass wall CCTV showing belt",
 emoji:"🧩",
 desc:"Plugin manager, Blue Ocean pipeline visualization, warnings",
 content:`
  <span class="badge">UX Chapter</span>
  <h1>Upgrades & Glass Walls</h1>
  <div class="analogy-box"><div class="analogy-emoji">🧩</div><div class="analogy-text"><strong>Analogy:</strong> Base factory can assemble wood. Need metal cutting? Snap on plasma cutter plugin. Blue Ocean = replace brick wall with glass so customers see car moving station-to-station, not just logs.</div></div>
  <h2>Must-Have Plugins Pack</h2>
  <table><tr><th>Plugin</th><th>Factory upgrade</th></tr>
  <tr><td>Blue Ocean</td><td>Glass dashboard + modern pipeline editor</td></tr>
  <tr><td>Pipeline: Stage View</td><td>Assembly line timeline</td></tr>
  <tr><td>Docker Pipeline</td><td>Pop-up work tents</td></tr>
  <tr><td>GitHub Branch Source</td><td>Auto-detect new product models (branches)</td></tr>
  <tr><td>Credentials Binding</td><td>Locked cabinets integration</td></tr>
  <tr><td>AnsiColor</td><td>Colorful safety signs in logs</td></tr>
  <tr><td>Warnings NG</td><td>QC flashing lights</td></tr>
  </table>
  <div class="code-block"><div class="code-head"><span>Install via CLI / JCasC</span><button class="copy-btn" onclick="copyCode(this)">Copy</button></div><pre><code>jenkins-plugin-cli --plugins blueocean docker-workflow github-branch-source

# Or in Dockerfile:
FROM jenkins/jenkins:lts
RUN jenkins-plugin-cli --plugins blueocean:1.27.9 workflow-aggregator
</code></pre></div>
  <h2>Blue Ocean Tips</h2>
  <ul><li>Open → Blue Ocean link in sidebar → See pipeline as horizontal flow.</li><li>Click stage → see logs per step, re-run stage.</li><li>Pipeline editor (legacy) can generate Jenkinsfile visually.</li></ul>
  <div class="callout"><strong>Plugin warning:</strong> Don't install every shiny tool. Each plugin = bigger attack surface + upgrade pain. Factory doesn't need 10 different hammers.</div>
`
},
{
 id:10,
 title:"The SOP Library — Shared Libraries",
 analogy:"Standard Operating Procedures binder photocopied for all lines",
 emoji:"📚",
 desc:"DRY, vars/, src/, global shared library",
 content:`
  <span class="badge">Lab 7 Inside • DRY</span>
  <h1>The SOP Library</h1>
  <p class="muted">If you have 20 product lines copying same 'build Docker and push' steps, one typo = recall. Put common steps in one SOP binder (Shared Library) — update once, all lines use new version.</p>
  <div class="analogy-box"><div class="analogy-emoji">📚</div><div class="analogy-text"><strong>Structure:</strong> <code>vars/</code> = recipes anyone can call like <code>buildDocker()</code>. <code>src/</code> = helper classes (calculators).</div></div>
  <h2>Library Repo Structure</h2>
  <div class="code-block"><div class="code-head"><span>shared-lib repository</span></div><pre><code>(root)
├── vars/
│   ├── buildDocker.groovy
│   ├── deployK8s.groovy
│   └── slackNotify.groovy
├── src/com/example/
│   └── Utils.groovy
└── resources/
    └── k8s-deployment.yaml
</code></pre></div>
  <h3>vars/buildDocker.groovy</h3>
  <div class="code-block"><div class="code-head"><span>Groovy var</span><button class="copy-btn" onclick="copyCode(this)">Copy</button></div><pre><code>def call(Map config) {
  def image = "\${config.registry}/\${config.name}:\${env.BUILD_NUMBER}"
  sh "docker build -t \${image} ."
  sh "docker push \${image}"
  echo "Pushed \${image}"
}
</code></pre></div>
  <h3>Use in Jenkinsfile</h3>
  <div class="code-block"><div class="code-head"><span>Jenkinsfile</span><button class="copy-btn" onclick="copyCode(this)">Copy</button></div><pre><code>@Library('my-shared-lib@main') _
pipeline {
  agent any
  stages {
    stage('Build Image') {
      steps { buildDocker(registry:'myorg', name:'shop') }
    }
    stage('Notify') { steps { slackNotify(channel:'#deploys') } }
  }
}
</code></pre></div>
  <h2>Setup in Jenkins</h2>
  <p>Manage Jenkins → System → Global Pipeline Libraries → Name: <code>my-shared-lib</code>, Default version: <code>main</code>, Enable GitHub, Retrieval: Modern SCM.</p>
  <div class="lab"><div class="lab-head">🧪 Lab 7 — Build & Consume Shared Library</div><div class="lab-body">
  <ol><li>Create new GitHub repo <code>jenkins-shared-lib</code> with folder <code>vars/hello.groovy</code> containing <code>def call(){ echo 'Hello from lib!' }</code></li><li>Add library in Jenkins global config</li><li>In pipeline: <code>@Library('jenkins-shared-lib') _</code> then <code>hello()</code></li><li>Extend to <code>buildDocker</code> function.</li></ol>
  </div></div>
`
},
{
 id:11,
 title:"Mobile Workers — Docker & Kubernetes Agents",
 analogy:"Pop-up work tents and on-demand temp staff agency",
 emoji:"🐳",
 desc:"Docker Pipeline, K8s plugin, pod templates, ephemeral agents",
 content:`
  <span class="badge">Lab 6 Inside • Cloud Native</span>
  <h1>Mobile Workers</h1>
  <div class="analogy-box"><div class="analogy-emoji">🐳</div><div class="analogy-text"><strong>Analogy:</strong> Permanent benches get messy — old glue, dust. Instead, bring brand new tent per car, with exact tools needed, then burn it. No contamination. That's Docker/K8s agents.</div></div>
  <h2>Docker Agent Patterns</h2>
  <div class="code-block"><div class="code-head"><span>Jenkinsfile – docker agent</span><button class="copy-btn" onclick="copyCode(this)">Copy</button></div><pre><code>pipeline {
  agent {
    docker {
      image 'node:20-alpine'
      args '-v /tmp:/tmp' // mount cache if needed
    }
  }
  stages {
    stage('Build') { steps { sh 'node --version && npm ci' } }
  }
}
</code></pre></div>
  <div class="code-block"><div class="code-head"><span>Docker inside Dockerfile agent (Dockerfile agent)</span></div><pre><code>pipeline {
  agent { dockerfile { filename 'Dockerfile.agent' } }
  stages { stage('Test') { steps { sh 'make test' } } }
}
</code></pre></div>
  <h2>Kubernetes Agent</h2>
  <div class="code-block"><div class="code-head"><span>K8s pod template</span><button class="copy-btn" onclick="copyCode(this)">Copy</button></div><pre><code>pipeline {
  agent {
    kubernetes {
      yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: main
    image: maven:3.9-eclipse-temurin-17
    command: [cat]
    tty: true
  - name: kaniko
    image: gcr.io/kaniko-project/executor:debug
    command: [/busybox/cat]
    tty: true
'''
    }
  }
  stages {
    stage('Build Jar') {
      steps { container('main') { sh 'mvn package' } }
    }
  }
}
</code></pre></div>
  <div class="lab"><div class="lab-head">🧪 Lab 6 — Custom Docker Build Agent</div><div class="lab-body">
  <p>Create <code>Dockerfile.agent</code>:</p>
  <div class="code-block"><div class="code-head"><span>Dockerfile</span></div><pre><code>FROM jenkins/inbound-agent:latest-jdk17
USER root
RUN apt-get update && apt-get install -y python3 python3-pip nodejs npm
USER jenkins
</code></pre></div>
  <ol><li>Build image <code>docker build -f Dockerfile.agent -t myagent:1 .</code></li><li>Use it in Jenkinsfile <code>agent { docker { image 'myagent:1' } }</code></li><li>Run <code>sh 'python3 --version && npm --version'</code> to prove tools present.</li></ol>
  </div></div>
`
},
{
 id:12,
 title:"Quality Control — Tests, Parallel, Artifacts",
 analogy:"Inspection stations, parallel test tracks, boxing finished product",
 emoji:"🧪",
 desc:"junit, parallel, stash/unstash, archive, fingerprint",
 content:`
  <span class="badge">Lab 8 Inside • Quality</span>
  <h1>Quality Control</h1>
  <div class="analogy-box"><div class="analogy-emoji">🧪</div><div class="analogy-text"><strong>Analogy:</strong> Car doesn't go from welding straight to shipping. QC stations: crash test, paint inspection, engine run. Some tests run in parallel — while one team checks brakes, another checks lights — faster line.</div></div>
  <h2>JUnit & Test Reporting</h2>
  <div class="code-block"><div class="code-head"><span>Publish tests</span><button class="copy-btn" onclick="copyCode(this)">Copy</button></div><pre><code>stage('Test') {
  steps { sh 'npm test -- --reporter=junit --outputFile=junit.xml' }
  post { always { junit 'junit.xml' } }
}
</code></pre></div>
  <h2>Parallel Stages (Declarative)</h2>
  <div class="code-block"><div class="code-head"><span>Parallel</span><button class="copy-btn" onclick="copyCode(this)">Copy</button></div><pre><code>stage('QC Parallel') {
  parallel {
    stage('Unit') { steps { sh 'npm run test:unit' } }
    stage('Lint') { steps { sh 'npm run lint' } }
    stage('Security Scan') {
      agent { docker { image 'aquasec/trivy:latest' } }
      steps { sh 'trivy fs .' }
    }
  }
}
</code></pre></div>
  <h2>Artifacts & Fingerprints</h2>
  <div class="code-block"><div class="code-head"><span>Archive</span></div><pre><code>stage('Package') {
  steps {
    sh 'npm run build'
    archiveArtifacts artifacts:'dist/**, coverage/**', fingerprint:true
    stash name:'built', includes:'dist/**'
  }
}
stage('Deploy') {
  steps { unstash 'built'; sh 'ls dist' }
}
</code></pre></div>
  <div class="lab"><div class="lab-head">🧪 Lab 8 — Parallel Tests + Archive</div><div class="lab-body">
  <ol><li>In Jenkinsfile, create parallel block with 3 branches each <code>echo</code> + <code>sleep 5</code> to see concurrency in Blue Ocean.</li><li>Add <code>archiveArtifacts</code> for a file you create <code>sh 'echo v${BUILD_NUMBER} > version.txt'</code></li><li>Check job → build → Artifacts tab downloads version.txt</li></ol>
  </div></div>
`
},
{
 id:13,
 title:"Factory Security — RBAC, Folders, Credentials Scoping",
 analogy:"Badge readers, security zones, locked cages for expensive tools",
 emoji:"🛡️",
 desc:"Matrix auth, folders, credentials domains, audit trail",
 content:`
  <span class="badge">Lab 10 Inside • Hardening</span>
  <h1>Factory Security</h1>
  <div class="analogy-box"><div class="analogy-emoji">🛡️</div><div class="analogy-text"><strong>Analogy:</strong> Not every worker can open safe or enter paint booth. Painters get paint zone badge, welders get welding. Same for Jenkins — devs can run dev pipelines, not edit prod deploy.</div></div>
  <h2>Security Checklist</h2>
  <ul><li>Controller executors = 0 (no builds on foreman desk)</li><li>Enable Matrix Authorization: Manage → Security → Authorization → Matrix</li><li>Use Folders plugin: Team A folder holds their jobs + creds scoped to folder</li><li>Credentials scoping: Global vs Folder — like master key vs department key</li><li>CSRF protection + Agent → Controller security: check "Enable agent→controller security"</li><li>Keep Jenkins + plugins updated monthly like safety inspections</li></ul>
  <h2>Folders + RBAC Example</h2>
  <div class="code-block"><div class="code-head"><span>Setup</span></div><pre><code>New Item → Folder → Name: "Team-Shop"
Inside folder → New Item → Pipeline "shop-deploy"
Folder → Credentials → Add Docker credential scoped only to that folder
Team members get Job/Build, not Job/Configure for prod folder
</code></pre></div>
  <h2>JCasC (Configuration as Code) Bonus</h2>
  <div class="code-block"><div class="code-head"><span>jenkins.yaml snippet</span><button class="copy-btn" onclick="copyCode(this)">Copy</button></div><pre><code>jenkins:
  securityRealm:
    local:
      allowsSignup: false
  authorizationStrategy:
    globalMatrix:
      permissions:
        - "Overall/Read:authenticated"
        - "Job/Build:authenticated"
        - "Overall/Administer:admin"
unclassified:
  location:
    url: https://jenkins.example.com/
</code></pre></div>
  <div class="lab"><div class="lab-head">🧪 Lab 10 (part A) — Folder Isolation</div><div class="lab-body">
  <ol><li>Create Folder "Acme" → Inside create pipeline that uses credential ID that only exists in folder (not global) — shows scoping.</li><li>Create user "dev" (Manage → Users), assign only Build in Matrix for Acme folder.</li><li>Login as dev, try to configure job → denied. Try Build → allowed.</li></ol>
  </div></div>
`
},
{
 id:14,
 title:"Mass Production — Multibranch & Organization Folders",
 analogy:"Auto-create new line whenever new car model blueprint arrives",
 emoji:"🌿",
 desc:"Multibranch pipelines, GitHub org scanning, PR discovery",
 content:`
  <span class="badge">Lab 9 Inside • Git-native</span>
  <h1>Mass Production</h1>
  <p class="muted">When you have 50 branches and 100 repos, you can't manually create jobs. Jenkins scans Git provider and auto-creates/deletes conveyor lines per branch/PR like auto factory.</p>
  <div class="analogy-box"><div class="analogy-emoji">🌿</div><div class="analogy-text"><strong>Analogy:</strong> Multibranch = factory that watches design office. When designer submits new model (branch), factory automatically builds a mini-line for it. When model cancelled (branch deleted), line removed.</div></div>
  <h2>Multibranch Pipeline</h2>
  <ul><li>Requires Jenkinsfile in each branch root</li><li>Auto-discovers branches, PRs</li><li>Can have branch-specific when conditions</li></ul>
  <div class="code-block"><div class="code-head"><span>Jenkinsfile – PR aware</span><button class="copy-btn" onclick="copyCode(this)">Copy</button></div><pre><code>pipeline {
  agent any
  stages {
    stage('Build') { steps { echo "Branch \${BRANCH_NAME}" } }
    stage('Deploy PR preview') {
      when { changeRequest() } // only PRs
      steps { echo "Preview for PR \${CHANGE_ID}" }
    }
    stage('Deploy main') {
      when { branch 'main' }
      steps { echo 'Deploy to prod' }
    }
  }
}
</code></pre></div>
  <h2>GitHub Organization Folder</h2>
  <p>In Jenkins: New Item → GitHub Organization → Add GitHub credentials (PAT) → Owner = your GitHub org/user. Jenkins scans all repos with Jenkinsfile and lists them.</p>
  <h2>Webhooks vs Polling</h2>
  <p>Create webhook in GitHub repo: Settings → Webhooks → <code>https://jenkins.example.com/github-webhook/</code> → push triggers scan instantly.</p>
  <div class="lab"><div class="lab-head">🧪 Lab 9 — Multibranch with Webhook</div><div class="lab-body">
  <ol><li>Create GitHub repo with Jenkinsfile simple echo BRANCH_NAME</li><li>In Jenkins: New Item → Multibranch Pipeline → Add source GitHub → creds PAT → Repo URL</li><li>Save → Scan starts, discovers main branch → build.</li><li>Create new branch <code>feature/cart</code> push → rescan → new job appears automatically.</li><li>Add GitHub webhook for instant.</li></ol>
  </div></div>
`
},
{
 id:15,
 title:"Running a Real Factory — Production, Scaling, Backup & Capstone",
 analogy:"24/7 lights-on factory, backup generators, fire drills",
 emoji:"🚀",
 desc:"Production hardening, JCasC, backups, monitoring, Capstone full CI/CD",
 content:`
  <span class="badge">Capstone + Production</span>
  <h1>Running a Real Factory</h1>
  <div class="analogy-box"><div class="analogy-emoji">🚀</div><div class="analogy-text"><strong>Final analogy:</strong> Hobby factory runs when you are there. Real factory runs at 3am with lights, alarms, backup power, and documented runbooks.</div></div>
  <h2>Production Checklist</h2>
  <ul><li><strong>HA:</strong> Controller in K8s with PVC for JENKINS_HOME, backups to S3</li><li><strong>Cache:</strong> Use artifact repo (Nexus/Artifactory) for dependencies</li><li><strong>Agents:</strong> Ephemeral Kubernetes pods autoscaled, no static VMs</li><li><strong>Backup:</strong> Thin Backup plugin or <code>tar JENKINS_HOME</code> + jobs + credentials.xml (encrypted)</li><li><strong>Monitoring:</strong> Prometheus metrics plugin + Grafana dashboard, alert on queue >10, executors busy 100%</li><li><strong>JCasC + JobDSL:</strong> Everything as code — Jenkins config in Git, re-create in minutes</li></ul>
  <h2>Backup Command</h2>
  <div class="code-block"><div class="code-head"><span>Backup</span><button class="copy-btn" onclick="copyCode(this)">Copy</button></div><pre><code># From controller pod/host
tar -czf jenkins-backup-$(date +%F).tgz $JENKINS_HOME --exclude=$JENKINS_HOME/war --exclude=$JENKINS_HOME/cache
aws s3 cp jenkins-backup-*.tgz s3://my-jenkins-backups/

# Restore: stop jenkins, untar to JENKINS_HOME, fix perms, start
</code></pre></div>
  <div class="lab"><div class="lab-head">🧪 Lab 10 (part B) — Hardening & Backup</div><div class="lab-body">
  <ol><li>Install Thin Backup plugin → Manage → Thin Backup → Settings → Backup dir /backups, schedule daily 2am</li><li>Run backup, check files created.</li><li>Test restore on new Docker volume: copy backup, start second Jenkins container mounting backup.</li>
  <li>Install Prometheus metrics plugin, visit <code>/metrics</code> endpoint, add to Prometheus.</li></ol>
  </div></div>
  <h2>🏆 Capstone: Full Microservice Factory</h2>
  <div class="lab"><div class="lab-head">🏆 Capstone Project — Build the Ultimate Factory Line</div><div class="lab-body">
  <p><strong>Scenario:</strong> You own an e-commerce shop app (frontend + api). CEO wants: every PR gets preview, main auto-deploys to staging, prod needs manager approval + Slack notification.</p>
  <p><strong>Requirements checklist (must implement all):</strong></p>
  <ul class="checklist">
  <li>✅ Multibranch pipeline (main, PRs auto-discovered)</li>
  <li>✅ Docker agent for build: <code>node:20</code> + custom tools</li>
  <li>✅ Shared library function <code>dockerBuildPush(registry,name)</code></li>
  <li>✅ Stages: Checkout → Build → Unit Test (parallel Lint/Security) → Build Image → Push → Deploy Staging (K8s or docker-compose) → Manual approval → Deploy Prod</li>
  <li>✅ Credentials: Docker Hub creds from Jenkins store (no hardcoded)</li>
  <li>✅ Artifacts: Archive test reports + image tag list</li>
  <li>✅ Notifications: slackNotify or email in post block</li>
  <li>✅ Blue Ocean view proves green across all branches</li>
  </ul>
  <h3>Starter Jenkinsfile for Capstone</h3>
  <div class="code-block"><div class="code-head"><span>Capstone Jenkinsfile</span><button class="copy-btn" onclick="copyCode(this)">Copy</button></div><pre><code>@Library('my-shared-lib@main') _
pipeline {
  agent { 
    docker { image 'node:20-alpine' }
  }
  options { buildDiscarder(logRotator(numToKeepStr:'20')); timestamps() }
  stages {
    stage('Checkout'){ steps{ checkout scm } }
    stage('Install'){ steps{ sh 'npm ci' } }
    stage('QC') {
      parallel {
        stage('Unit'){ steps{ sh 'npm test' } }
        stage('Lint'){ steps{ sh 'npm run lint || echo lint warnings' } }
        stage('Scan'){
          agent { docker { image 'aquasec/trivy:latest' } }
          steps{ sh 'trivy fs --severity HIGH,CRITICAL . || true' }
        }
      }
    }
    stage('Build Image'){
      steps { buildDocker(registry: 'mydockerorg', name: 'shop-app') }
    }
    stage('Deploy Staging'){
      when{ branch 'main' }
      steps{ echo 'kubectl apply -f k8s/staging/ ...' }
    }
    stage('Approve Prod'){
      when{ branch 'main' }
      steps{ input message:'Promote to PROD?', ok:'Ship it' }
    }
    stage('Deploy Prod'){
      when{ branch 'main' }
      steps{ echo 'kubectl apply -f k8s/prod/' }
    }
  }
  post {
    always { junit allowEmptyResults:true, testResults:'**/junit.xml'; archiveArtifacts artifacts:'dist/**', allowEmptyArchive:true }
    success { slackNotify(channel:'#deploys') }
    failure { echo 'Build failed - check Blue Ocean' }
  }
}
</code></pre></div>
  <p><strong>Deliverable:</strong> Screenshot Blue Ocean green pipeline, link to GitHub repo with Jenkinsfile + shared lib, 2-min Loom walkthrough explaining factory analogy stations.</p>
  <p>Grade yourself: If you can explain to a non-tech friend why <em>pipeline=conveyor, agent=worker, Jenkinsfile=manual, shared lib=SOP binder</em>, you are factory foreman certified.</p>
  </div></div>
  <h2>What's Next?</h2>
  <ul><li>Connect Jenkins to ArgoCD / Spinnaker for GitOps: Jenkins builds, Argo deploys</li><li>Learn JobDSL + JCasC to make factory reproducible in 1 command</li><li>Explore Jenkins X / Tekton for cloud-native evolution</li><li>Teach this course — best way to master.</li></ul>
`
}
];
