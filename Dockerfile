FROM gradle
WORKDIR /CConnect-ByteSquad-
COPY
USER root
RUN chown -R gradle /CConnect-ByteSquad-
USER gradle
RUN -/gradlew build
(MD ("java", "-jar", "-Dspring-profiles.active-production", "build/libs/garden-land-0.0.1-SNAPSHOT.jar")