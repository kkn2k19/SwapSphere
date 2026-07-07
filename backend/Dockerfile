# ---------- Stage 1 : Build ----------
    FROM eclipse-temurin:21-jdk AS builder
    
    WORKDIR /app
    
    # Copy Maven Wrapper
    COPY mvnw .
    COPY .mvn .mvn
    
    # Copy pom.xml
    COPY pom.xml .
    
    # Download dependencies (helps with Docker layer caching)
    RUN chmod +x mvnw
    RUN ./mvnw dependency:go-offline
    
    # Copy source code
    COPY src src
    
    # Build the application
    RUN ./mvnw clean package -DskipTests
    
    # ---------- Stage 2 : Runtime ----------
    FROM eclipse-temurin:21-jre
    
    WORKDIR /app
    
    # Copy JAR from builder
    COPY --from=builder /app/target/*.jar app.jar
    
    # Render provides the PORT environment variable
    EXPOSE 10000
    
    ENTRYPOINT ["java","-jar","app.jar"]