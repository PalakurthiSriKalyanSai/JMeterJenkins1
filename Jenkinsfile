pipeline {
    agent any
    stages {
        stage('Performance Testing') {
            steps {
                bat 'k6 run --out influxdb=http://localhost:8086/test API.js'
            }
        }
    }
}
