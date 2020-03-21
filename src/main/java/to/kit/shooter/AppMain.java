package to.kit.shooter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * メイン.
 * @author H.Sasai
 */
@SpringBootApplication
@Configuration
public class AppMain extends WebSecurityConfigurerAdapter {
	/**
	 * メイン.
	 * @param args 引数
	 */
	public static void main(String[] args) {
		SpringApplication.run(AppMain.class, args);
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/css/**", "/img/**", "/js/**",
				"/visual/src/**", "/audio/webm/**", "/audio/audio/**");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests(a -> a.antMatchers("/", "/login",
				"/product/list", "/product/play/**", "/product/select/**", "/product/increase/**",
				"/score/save").permitAll()
				.anyRequest().authenticated())
			.oauth2Login(o -> o.loginPage("/login"));
	}
}
