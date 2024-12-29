pipeline {
    agent any
    tools {
        nodejs "Node" 
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Clone the repository
                git branch: 'main', url: 'https://github.com/locoioioi/COSC2767-RMIT-Store'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('client') {
                    // Install dependencies
                    sh 'npm install'
                }
            }
        }

        stage('Build React App') {
            steps {
                dir('client') {
                    // Run the build script
                    sh 'npm run build'
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                // Save the build output for later use or deployment
                archiveArtifacts artifacts: 'client/dist/**/*', allowEmptyArchive: false
            }
        }
    }

    post {
        success {
            echo 'React.js build completed successfully!'
        }
        failure {
            echo 'React.js build failed. Check the logs for more details.'
        }
    }
}