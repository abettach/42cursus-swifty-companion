import React from "react";
import { View, Text } from "react-native";
import { Bar } from "react-native-progress";

interface ISkillsInformationProps {
  skills: any;
}

const SkillsInformation = (props: ISkillsInformationProps) => {
  const { skills } = props;

  return (
    <>
      {skills[0]?.skills.length === 0 && (
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Text>No skills found</Text>
        </View>
      )}
      {skills[0]?.skills.length > 0 && (
        <View
          style={{
            marginBottom: 100,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          {skills[0].skills.map((skill) => {
            return (
              <View
                style={{
                  width: "90%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginBottom: 10,
                }}
                key={Math.random() * 10}
              >
                <Text style={{ maxWidth: 150 }}>{skill.name}</Text>
                <Bar progress={skill.level / 20} width={200} />
              </View>
            );
          })}
        </View>
      )}
    </>
  );
};

export default SkillsInformation;
