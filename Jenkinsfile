pipeline {
    agent any
    stages {
        stage('Performance Testing') {
            steps {
                echo 'Grafana link -http://localhost:3000/d/vnIGABo4k/k6?orgId=1&refresh=5s'
                bat 'k6 run --out influxdb=http://localhost:8086/test API.js'
                
            }
        }
    }
}
