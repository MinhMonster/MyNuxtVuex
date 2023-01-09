<template>
  <client-only dark placeholder="loading...">
    <div>
      <b-form-group>
        <b-tabs>
          <b-tab title="Ruby">
            <codemirror
              v-model="sampleCode"
              :options="{
                lineWrapping: true,
                mode: `text/x-vue`,
                viewportMargin: 15,
                readOnly: false,
                theme: `vscode-dark`,
              }"
            >
            </codemirror>

            <codemirror
              :value="java"
              :options="{
                lineWrapping: true,
                mode: `text/x-java`,
                viewportMargin: 15,
                readOnly: true,
              }"
            ></codemirror>
            <!-- <codemirror
  v-model="sampleCode"
  :options="{
  lineWrapping: true,
  mode: `text/x-ruby`,
  viewportMargin: 15,
  readOnly: true,
  }"
  ></codemirror> -->
          </b-tab>
          <b-tab title="Java">
            <codemirror
              :value="sampleCode"
              :options="{
                lineWrapping: true,
                mode: `text/x-java`,
                viewportMargin: 20,
                readOnly: true,
              }"
            ></codemirror>
          </b-tab>
          <b-tab title="PHP">
            <codemirror
              :value="sampleCode"
              :options="{
                lineWrapping: true,
                mode: `application/x-httpd-php`,
                viewportMargin: 12,
                readOnly: true,
              }"
            ></codemirror>
          </b-tab>
        </b-tabs>
      </b-form-group>
    </div>
  </client-only>
</template>
  <script>
export default {
  components: {},
  data() {
    return {
      editorOption: {
        tabSize: 1,
        mode: "text/javascript",
        theme: "base16-dark",
        lineNumbers: true,
        line: true,
      },
      java: `
  import java.net.URLEncoder;
  import java.util.Base64;
  import javax.crypto.Mac;
  import javax.crypto.spec.SecretKeySpec;
  import java.security.NoSuchAlgorithmException;
  import java.security.InvalidKeyException;
  import java.io.UnsupportedEncodingException;
  
   
  class Test {
  public static void main(String[] args) {
  String algo = "HmacSHA256";
  try {
  String privateKey = "607ac484936e5561c87758a3e33d2ce3";
  String queryString = "ext=user01&ts=1673234169";
  
   
  SecretKeySpec sk = new SecretKeySpec(privateKey.getBytes(), algo);
  
   
  Mac hmacSha1 = Mac.getInstance(algo);
  hmacSha1.init(sk);
  
   
  byte[] hash = hmacSha1.doFinal(queryString.getBytes());
  String digested = Base64.getEncoder().encodeToString(hash);
  String sig = URLEncoder.encode(digested, "UTF-8");
  
   
  String url = String.format("https://localhost:8080/shop/connect?%s&sig=%s", queryString, sig);
  System.out.println(url);
  
   
  //上記例で生成されるURLは
  //https://localhost:8080/shop/connect?ext=user01&ts=1673234169&sig=2CPUDe1zoPewp6EFjKGW%2BBJhfWSJBwxvJUGfKrUVh0E%3D
  } catch (NoSuchAlgorithmException e) {
  e.printStackTrace();
  } catch (UnsupportedEncodingException e) {
  e.printStackTrace();
  } catch (InvalidKeyException e) {
  e.printStackTrace();
  }
  }
  }
  `,
      sampleCode: `
  <template>
  <v-row justify="center" align="center">
  <v-col cols="12" sm="8" md="6">
  <v-card class="logo py-4 d-flex justify-center">
  <NuxtLogo />
  <VuetifyLogo />
  </v-card>
  <h1>{{this.test}}</h1>
  </v-col>
  </v-row>
  </template>
  
   
  <style lang="scss" scoped>
  .CodeMirror {
  height: auto;
  resize: horizontal;
  }
  .CodeMirror-wrap pre {
  word-break: break-word;
  }
  </style>
  `,
    };
  },
  computed: {},
};
</script>
  
   
  <style >
.CodeMirror {
  height: auto !important;
  resize: horizontal;
}
.CodeMirror-wrap pre {
  word-break: break-word;
}
</style>
  