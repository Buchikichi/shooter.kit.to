package to.kit.shooter;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import com.google.javascript.jscomp.AbstractCommandLineRunner;
import com.google.javascript.jscomp.Compiler;
import com.google.javascript.jscomp.CompilerOptions;
import com.google.javascript.jscomp.CompilerOptions.LanguageMode;
import com.google.javascript.jscomp.JSError;
import com.google.javascript.jscomp.PropertyRenamingPolicy;
import com.google.javascript.jscomp.Result;
import com.google.javascript.jscomp.SourceFile;
import com.google.javascript.jscomp.VariableRenamingPolicy;

public final class CompMain {
	private List<SourceFile> listSource(File dir) {
		List<SourceFile> list = new ArrayList<>();

		for (File file : dir.listFiles()) {
			list.add(SourceFile.fromFile(file));
		}
		return list;
	}

	private void execute(File dir, File outFile) throws IOException {
		Compiler compiler = new Compiler(System.out);
//		Compiler.setLoggingLevel(Level.ALL);
		List<SourceFile> externs = AbstractCommandLineRunner.getBuiltinExterns(CompilerOptions.Environment.BROWSER);
		List<SourceFile> inputs = listSource(dir);
	    CompilerOptions options = new CompilerOptions();

		// compile
		options.setLanguageIn(LanguageMode.ECMASCRIPT_2016);
		options.setLanguageOut(LanguageMode.ECMASCRIPT5_STRICT);
	    options.setRenamingPolicy(VariableRenamingPolicy.LOCAL, PropertyRenamingPolicy.OFF);
//		options.setTracerMode(TracerMode.ALL);
		Result result = compiler.compile(externs, inputs, options);

		for (JSError err : result.errors) {
			System.out.println(err.toString());
		}
		if (result.errors.length == 0) {
			try (Writer writer = new FileWriter(outFile)) {
				writer.write(compiler.toSource());
			}
			System.out.println("Complete.");
		}
	}

	/**
	 * メイン.
	 * @param args 引数
	 * @throws Exception 例外
	 */
	public static void main(String[] args) throws Exception {
		if (args.length < 2) {
			return;
		}
		File dir = new File(args[0]);
		if (!dir.isDirectory()) {
			return;
		}
		File outFile = new File(args[1]);
		CompMain app = new CompMain();

		app.execute(dir, outFile);
	}
}
