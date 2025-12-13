// // ResumeDocument.jsx
// import React from "react";
// import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// // Styles
// const styles = StyleSheet.create({
//   page: { padding: 30, fontSize: 12, fontFamily: "Helvetica" },
//   header: { fontSize: 20, marginBottom: 10, textAlign: "center" },
//   section: { marginBottom: 10 },
//   title: { fontSize: 16, marginBottom: 5 },
//   text: { lineHeight: 1.5 },
// });

// export const ResumeDocument = ({ content }) => {
//   // content is the AI response string
//   const lines = content.split("\n");

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <Text style={styles.header}>AI Enhanced Resume</Text>
//         {lines.map((line, idx) => (
//           <Text key={idx} style={styles.text}>
//             {line}
//           </Text>
//         ))}
//       </Page>
//     </Document>
//   );
// };


// ResumeDocument.jsx
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: "Helvetica" },
  name: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  header: { fontSize: 16, fontWeight: "bold", marginTop: 15, marginBottom: 5, color: "#4b0082" },
  sectionText: { fontSize: 12, marginBottom: 5, lineHeight: 1.4 },
  separator: { borderBottom: "1px solid #ccc", marginVertical: 5 },
});

export const ResumeDocument = ({ content }) => {
  const sections = content.split("---").map(s => s.trim()).filter(s => s);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {sections.map((section, idx) => {
          const lines = section.split("\n").filter(line => line.trim() !== "");
          return (
            <View key={idx} style={{ marginBottom: 10 }}>
              <Text style={idx === 0 ? styles.name : styles.header}>{lines[0]}</Text>
              {lines.slice(1).map((line, i) => (
                <Text key={i} style={styles.sectionText}>{line}</Text>
              ))}
              <Text style={styles.separator} />
            </View>
          );
        })}
      </Page>
    </Document>
  );
};
